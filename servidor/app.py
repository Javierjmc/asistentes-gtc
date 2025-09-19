from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  # Permite peticiones desde React

# Configuración de MongoDB
app.config["MONGO_URI"] = "mongodb+srv://javierjmc:3987111189@cluster0.0w9su.mongodb.net/gtc"
mongo = PyMongo(app)

# Endpoint para mostrar todos los datos
@app.route('/datos', methods=['GET'])
def get_datos():
    datos = mongo.db.tu_coleccion.find()
    lista_datos = []
    for dato in datos:
        dato['_id'] = str(dato['_id']) # Convierte el ObjectId a string
        lista_datos.append(dato)
    return jsonify(lista_datos)

# Endpoint para crear un nuevo dato
@app.route('/datos', methods=['POST'])
def add_dato():
    nuevo_dato = request.json
    resultado = mongo.db.tu_coleccion.insert_one(nuevo_dato)
    nuevo_dato['_id'] = str(resultado.inserted_id)
    return jsonify(nuevo_dato)

# Endpoint para modificar un dato
@app.route('/datos/<id>', methods=['PUT'])
def update_dato(id):
    dato_actualizado = request.json
    mongo.db.tu_coleccion.update_one({'_id': ObjectId(id)}, {'$set': dato_actualizado})
    return jsonify({"message": "Dato actualizado con éxito"})

# Endpoint para eliminar un dato
@app.route('/datos/<id>', methods=['DELETE'])
def delete_dato(id):
    mongo.db.tu_coleccion.delete_one({'_id': ObjectId(id)})
    return jsonify({"message": "Dato eliminado con éxito"})

if __name__ == '__main__':
    app.run(debug=True)