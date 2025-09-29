from flask import Flask, request, jsonify, Blueprint
from flask_pymongo import PyMongo
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from bson.objectid import ObjectId
from datetime import datetime
from functools import wraps  
import os
import cloudinary
import cloudinary.uploader
import cloudinary.api

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = Flask(__name__)
FRONTEND_URL = "https://asistentes-gtc.vercel.app" 

CORS(app, resources={
    # Aplica esta configuración a todas las rutas (todas las rutas de la API)
    r"/*": {
        "origins": FRONTEND_URL,
        # Necesario para el correcto manejo de POST, PUT, DELETE y pre-vuelo OPTIONS
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
        # Esencial para peticiones que envían tokens JWT en el header 'Authorization'
        "supports_credentials": True 
    }
})

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
jwt = JWTManager(app)
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Configuración de Cloudinary
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET")
)


# --- Decoradores de roles personalizados ---
def asistente_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get("role") != "asistente":
                return jsonify({"msg": "Acceso denegado: solo asistentes"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get("role") != "administrador":
                return jsonify({"msg": "Acceso denegado: solo administradores"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

# --- Rutas de Cloudinary ---
@app.route('/upload-image', methods=['POST'])
@jwt_required()
# @asistente_required() <--- SE ELIMINÓ ESTE DECORADOR
def upload_image():
    """Endpoint para subir imágenes a Cloudinary"""
    
    # NUEVA LÓGICA PARA PERMITIR ADMINISTRADOR O ASISTENTE
    claims = get_jwt()
    if claims.get("role") not in ["asistente", "administrador"]:
        return jsonify({"msg": "Acceso denegado: solo asistentes o administradores"}), 403
    # FIN DE NUEVA LÓGICA
    
    try:
        if 'image' not in request.files:
            return jsonify({"msg": "No se encontró ninguna imagen"}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({"msg": "No se seleccionó ningún archivo"}), 400
        
        # Validar tipo de archivo
        allowed_types = {'image/jpeg', 'image/jpg', 'image/png', 'image/gif'}
        if file.content_type not in allowed_types:
            return jsonify({"msg": "Tipo de archivo no permitido. Solo se permiten JPG, PNG y GIF"}), 400
        
        # Validar tamaño (10MB máximo)
        file.seek(0, 2)  # Ir al final del archivo
        file_size = file.tell()
        file.seek(0)  # Volver al inicio
        
        if file_size > 10 * 1024 * 1024:  # 10MB
            return jsonify({"msg": "El archivo es demasiado grande. Máximo 10MB"}), 400
        
        # Subir a Cloudinary
        upload_result = cloudinary.uploader.upload(
            file,
            folder="gtc-metricas",
            resource_type="image",
            transformation=[
                {"quality": "auto"},
                {"fetch_format": "auto"}
            ]
        )
        
        return jsonify({
            "msg": "Imagen subida exitosamente",
            "url": upload_result['secure_url'],
            "public_id": upload_result['public_id']
        }), 200
        
    except Exception as e:
        return jsonify({"msg": f"Error al subir la imagen: {str(e)}"}), 500

# --- Rutas de Autenticación ---

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    nombre = data.get("nombre")
    role = data.get('role', 'cliente') 

    if not all([email, password, nombre]):
        return jsonify({"msg": "Faltan campos requeridos"}), 400

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"msg": "El correo ya está registrado"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user_data = {
        "email": email,
        "password": hashed_password,
        "role": role,
        "nombre": nombre 
    }
    
    mongo.db.users.insert_one(new_user_data)
    
    return jsonify({"msg": "Usuario registrado exitosamente"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user_from_db = mongo.db.users.find_one({"email": email})

    if user_from_db and bcrypt.check_password_hash(user_from_db["password"], password):
        claims = {
            "role": user_from_db["role"],
            "nombre": user_from_db["nombre"]
        }
        access_token = create_access_token(identity=str(user_from_db['_id']), additional_claims=claims)
        
        return jsonify(access_token=access_token)
    
    return jsonify({"msg": "Correo o contraseña incorrectos"}), 401


# --- Nuevas Rutas para Administrador ---

@app.route('/clientes', methods=['GET'])
@jwt_required()
@admin_required()
def get_clients():
    clients = list(mongo.db.users.find({"role": "cliente"}))
    result = []

    for client in clients:
        client['_id'] = str(client['_id'])
        client.pop('password', None)
        
        asistentes_asignados_ids = client.get('asistentes_asignados', [])
        asistentes_data = []
        if asistentes_asignados_ids:
            asistentes_cursor = mongo.db.users.find({"_id": {"$in": asistentes_asignados_ids}})
            asistentes_data = [{
                "nombre": a.get("nombre"),
                "email": a.get("email"),
                "id": str(a.get("_id"))
            } for a in asistentes_cursor]
        
        client['asistentes_asignados'] = asistentes_data
        result.append(client)
    
    return jsonify(result), 200

@app.route('/asistentes', methods=['GET'])
@jwt_required()
@admin_required()
def get_asistentes():
    asistentes = list(mongo.db.users.find({"role": "asistente"}))
    result = []
    for asistente in asistentes:
        asistente['_id'] = str(asistente['_id'])
        asistente.pop('password', None)
        result.append(asistente)
    
    return jsonify(result), 200

@app.route('/clientes/<client_id>/asistentes', methods=['PUT'])
@jwt_required()
@admin_required()
def assign_asistentes(client_id):
    data = request.get_json()
    asistente_ids_str = data.get('asistente_ids', [])
    
    if not isinstance(asistente_ids_str, list):
        return jsonify({"msg": "Los IDs de asistente deben ser una lista"}), 400
        
    try:
        asistente_ids = [ObjectId(aid) for aid in asistente_ids_str]
        
        result = mongo.db.users.update_one(
            {"_id": ObjectId(client_id), "role": "cliente"},
            {"$set": {"asistentes_asignados": asistente_ids}}
        )
        
        if result.matched_count == 0:
            return jsonify({"msg": "Cliente no encontrado"}), 404
        
        return jsonify({"msg": "Asistentes asignados correctamente"}), 200

    except Exception as e:
        return jsonify({"msg": f"Error al asignar asistentes: {str(e)}"}), 500

# --- Rutas de Reportes (Nueva funcionalidad) ---
reportes_bp = Blueprint('reportes', __name__)

@reportes_bp.route('/', methods=['POST'])
@jwt_required()
@asistente_required()
def crear_reporte():
    datos = request.json
    cliente_id = datos.get('cliente_id')
    titulo = datos.get('titulo')
    contenido = datos.get('contenido')
    actividades = datos.get('actividades', [])
    objetivos = datos.get('objetivos', [])
    sugerencias = datos.get('sugerencias', [])
    metricas_imagenes = datos.get('metricas_imagenes', [])  # URLs de Cloudinary
    
    current_user_id = get_jwt_identity()
    
    cliente = mongo.db.users.find_one({'_id': ObjectId(cliente_id), 'asistentes_asignados': ObjectId(current_user_id)})
    if not cliente:
        return jsonify({"msg": "No tienes permisos para enviar un reporte a este cliente."}), 403

    reporte_data = {
        'cliente_id': ObjectId(cliente_id),
        'asistente_id': ObjectId(current_user_id),
        'titulo': titulo,
        'contenido': contenido,
        'actividades': actividades,
        'objetivos': objetivos,
        'sugerencias': sugerencias,
        'metricas_imagenes': metricas_imagenes,
        'fecha_creacion': datetime.utcnow(),
        'estado': 'pendiente'
    }
    
    mongo.db.reportes.insert_one(reporte_data)
    return jsonify({"msg": "Reporte creado exitosamente."}), 201

@reportes_bp.route('/', methods=['GET'])
@jwt_required()
@admin_required()
def obtener_reportes_admin():
    reportes = list(mongo.db.reportes.find().sort("fecha_creacion", -1))
    
    reports_with_details = []
    for reporte in reportes:
        cliente_id = reporte.get('cliente_id')
        cliente_data = mongo.db.users.find_one({'_id': cliente_id})
        cliente_nombre = cliente_data.get('nombre') if cliente_data else 'Cliente Desconocido'
        
        asistente_id = reporte.get('asistente_id')
        asistente_data = mongo.db.users.find_one({'_id': asistente_id})
        asistente_nombre = asistente_data.get('nombre') if asistente_data else 'Asistente Desconocido'
        
        reports_with_details.append({
            '_id': str(reporte['_id']),
            'titulo': reporte.get('titulo'),
            'contenido': reporte.get('contenido'),
            'estado': reporte.get('estado'),
            'fecha_creacion': reporte.get('fecha_creacion').isoformat() if reporte.get('fecha_creacion') else None,
            'cliente': {'id': str(cliente_id), 'nombre': cliente_nombre},
            'asistente': {'id': str(asistente_id), 'nombre': asistente_nombre}
        })
    
    return jsonify(reports_with_details), 200

# Nuevo: obtener un reporte por id (admin)
@reportes_bp.route('/<reporte_id>', methods=['GET'])
@jwt_required()
@admin_required()
def obtener_reporte_por_id(reporte_id):
    try:
        reporte = mongo.db.reportes.find_one({'_id': ObjectId(reporte_id)})
        if not reporte:
            return jsonify({"msg": "Reporte no encontrado"}), 404

        cliente = mongo.db.users.find_one({'_id': reporte.get('cliente_id')})
        asistente = mongo.db.users.find_one({'_id': reporte.get('asistente_id')})

        data = {
            '_id': str(reporte['_id']),
            'titulo': reporte.get('titulo'),
            'contenido': reporte.get('contenido'),
            'estado': reporte.get('estado'),
            'fecha_creacion': reporte.get('fecha_creacion').isoformat() if reporte.get('fecha_creacion') else None,
            'cliente': {
                'id': str(reporte.get('cliente_id')) if reporte.get('cliente_id') else None,
                'nombre': cliente.get('nombre') if cliente else 'Cliente Desconocido'
            },
            'asistente': {
                'id': str(reporte.get('asistente_id')) if reporte.get('asistente_id') else None,
                'nombre': asistente.get('nombre') if asistente else 'Asistente Desconocido'
            },
            'admin_texto': reporte.get('admin_texto') if reporte.get('admin_texto') else None,
            'admin_imagenes': reporte.get('admin_imagenes') if reporte.get('admin_imagenes') else [], # <--- AÑADIDO
            'metricas_imagenes': reporte.get('metricas_imagenes') if reporte.get('metricas_imagenes') else [],
        }
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener el reporte: {str(e)}"}), 500

@reportes_bp.route('/<reporte_id>', methods=['PUT'])
@jwt_required()
@admin_required()
def editar_reporte(reporte_id):
    datos = request.json
    update_fields = {
        'titulo': datos.get('titulo'),
        'contenido': datos.get('contenido'),
        'estado': 'editado',
        'fecha_edicion': datetime.utcnow()
    }
    # Campos opcionales que el admin puede editar
    if 'admin_texto' in datos:
        update_fields['admin_texto'] = datos.get('admin_texto')
    
    # HABILITADO: manejo de imágenes del administrador
    if 'admin_imagenes' in datos:
        # admin_imagenes: array de strings (URLs de Cloudinary)
        update_fields['admin_imagenes'] = datos.get('admin_imagenes')

    mongo.db.reportes.update_one(
        {'_id': ObjectId(reporte_id)},
        {'$set': update_fields}
    )
    return jsonify({"msg": "Reporte editado y actualizado."}), 200

# Ruta de aprobación deshabilitada temporalmente
# @reportes_bp.route('/<reporte_id>/aprobar', methods=['POST'])
# @jwt_required()
# @admin_required()
# def aprobar_reporte(reporte_id):
#     """Marca un reporte como aprobado por el administrador."""
#     mongo.db.reportes.update_one(
#         {'_id': ObjectId(reporte_id)},
#         {'$set': {'estado': 'aprobado', 'fecha_aprobacion': datetime.utcnow()}}
#     )
#     return jsonify({"msg": "Reporte aprobado."}), 200

@reportes_bp.route('/<reporte_id>/enviar', methods=['POST'])
@jwt_required()
@admin_required()
def enviar_reporte(reporte_id):
    mongo.db.reportes.update_one(
        {'_id': ObjectId(reporte_id)},
        {'$set': {'estado': 'enviado', 'fecha_envio': datetime.utcnow()}}
    )
    return jsonify({"msg": "Reporte reenviado al cliente."}), 200

# Nuevo: obtener reportes del cliente autenticado (rol cliente)
@reportes_bp.route('/mios', methods=['GET'])
@jwt_required()
def obtener_reportes_cliente():
    claims = get_jwt()
    if claims.get("role") != "cliente":
        return jsonify({"msg": "Acceso denegado: solo clientes"}), 403

    cliente_id = get_jwt_identity()
    # Solo ver reportes aprobados/enviados
    reportes = list(mongo.db.reportes.find({
        'cliente_id': ObjectId(cliente_id),
        'estado': {'$in': ['enviado', 'aprobado']}
    }).sort("fecha_creacion", -1))

    result = []
    for reporte in reportes:
        result.append({
            '_id': str(reporte['_id']),
            'titulo': reporte.get('titulo'),
            'contenido': reporte.get('contenido'),
            'estado': reporte.get('estado'),
            'fecha_creacion': reporte.get('fecha_creacion').isoformat() if reporte.get('fecha_creacion') else None,
            'admin_texto': reporte.get('admin_texto') if reporte.get('admin_texto') else None,
            'admin_imagenes': reporte.get('admin_imagenes') if reporte.get('admin_imagenes') else [], # <--- AÑADIDO
        })

    return jsonify(result), 200

# Nuevo: obtener reportes del asistente autenticado (rol asistente)
@reportes_bp.route('/mis', methods=['GET'])
@jwt_required()
@asistente_required()
def obtener_reportes_asistente():
    asistente_id = get_jwt_identity()
    reportes = list(mongo.db.reportes.find({
        'asistente_id': ObjectId(asistente_id)
    }).sort("fecha_creacion", -1))

    result = []
    for reporte in reportes:
        cliente_id = reporte.get('cliente_id')
        cliente = mongo.db.users.find_one({'_id': cliente_id})
        cliente_nombre = cliente.get('nombre') if cliente else 'Cliente Desconocido'

        result.append({
            '_id': str(reporte['_id']),
            'titulo': reporte.get('titulo'),
            'contenido': reporte.get('contenido'),
            'estado': reporte.get('estado'),
            'fecha_creacion': reporte.get('fecha_creacion').isoformat() if reporte.get('fecha_creacion') else None,
            'cliente': {
                'id': str(cliente_id) if cliente_id else None,
                'nombre': cliente_nombre
            }
        })

    return jsonify(result), 200

# Registra el nuevo blueprint
app.register_blueprint(reportes_bp, url_prefix='/reportes')

# Nuevo: obtener asistentes asignados para el cliente autenticado (rol cliente)
@app.route('/cliente/mis-asistentes', methods=['GET'])
@jwt_required()
def obtener_mis_asistentes_cliente():
    claims = get_jwt()
    if claims.get("role") != "cliente":
        return jsonify({"msg": "Acceso denegado: solo clientes"}), 403

    cliente_id = get_jwt_identity()
    cliente = mongo.db.users.find_one({'_id': ObjectId(cliente_id)})
    if not cliente:
        return jsonify({"msg": "Cliente no encontrado"}), 404

    asistentes_ids = cliente.get('asistentes_asignados', [])
    asistentes = []
    if asistentes_ids:
        cursor = mongo.db.users.find({"_id": {"$in": asistentes_ids}})
        for a in cursor:
            asistentes.append({
                'id': str(a.get('_id')),
                'nombre': a.get('nombre'),
                'email': a.get('email')
            })

    return jsonify(asistentes), 200

# ruta para los clientes asignados a un asistente
@app.route('/asistente/mis-clientes', methods=['GET'])
@jwt_required()
@asistente_required()
def get_my_clients():
    """
    Ruta para que un asistente obtenga la lista de sus clientes asignados.
    Requiere un token JWT con el rol 'asistente'.
    """
    try:
        # Obtener el ID del asistente del token JWT
        asistente_id = get_jwt_identity()
        asistente_obj_id = ObjectId(asistente_id)

        # Buscar en la base de datos a los clientes asignados a este asistente.
        # La búsqueda se realiza en el array 'asistentes_asignados'.
        clientes = list(mongo.db.users.find({
            "role": "cliente",
            "asistentes_asignados": asistente_obj_id
        }))

        # Formatear la respuesta para el frontend
        result = []
        for cliente in clientes:
            # Convertir el ObjectId a string
            cliente['_id'] = str(cliente['_id'])
            # Eliminar el campo de la contraseña por seguridad
            cliente.pop('password', None)
            
            # Formatear la lista de asistentes asignados para incluir nombre e ID
            asistentes_asignados_ids = cliente.get('asistentes_asignados', [])
            asistentes_data = []
            if asistentes_asignados_ids:
                asistentes_cursor = mongo.db.users.find({"_id": {"$in": asistentes_asignados_ids}})
                asistentes_data = [{
                    "nombre": a.get("nombre"),
                    "email": a.get("email"),
                    "id": str(a.get("_id"))
                } for a in asistentes_cursor]
            
            cliente['asistentes_asignados'] = asistentes_data
            result.append(cliente)

        return jsonify(result), 200

    except Exception as e:
        # Manejo de errores para cualquier excepción inesperada
        return jsonify({"msg": f"Error del servidor: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)