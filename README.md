🌟 Características Principales
Frontend con React y Vite: Interfaz de usuario moderna, rápida y reactiva.

Backend con Flask: API RESTful ligera y eficiente para la lógica del servidor.

Base de Datos con MongoDB (Atlas): Almacenamiento flexible y escalable de datos no relacionales.

Almacenamiento de Archivos con Cloudinary: Gestión de imágenes, videos y otros activos multimedia en la nube.

Arquitectura Completa (Full-Stack): Comunicación fluida entre el cliente (React) y el servidor (Flask).

🛠️ Tecnologías Utilizadas
Componente	Tecnología	Descripción
Frontend	Vite + React	Herramienta de construcción y biblioteca para la UI.
Backend	Flask	Microframework de Python para el servidor API.
Base de Datos	MongoDB	Base de datos NoSQL para almacenamiento de datos.
Almacenamiento	Cloudinary	Servicio para subir y gestionar activos multimedia.
Lenguajes	JavaScript/JSX, Python	Lenguajes principales utilizados.

📝 Prerrequisitos
Antes de comenzar, asegúrate de tener instalado:

Node.js y npm/yarn: Para el frontend.

Python 3: Para el backend.

Git: Para clonar el repositorio.

💻 Configuración e Instalación
Sigue estos pasos para levantar la aplicación en tu entorno local.


Bash

cd server
Crea un entorno virtual (recomendado):

Bash

python3 -m venv venv
source venv/bin/activate  # En Linux/macOS
# venv\Scripts\activate  # En Windows
Instala las dependencias de Python:

Bash

pip install -r requirements.txt # (Asegúrate de tener este archivo)
Configuración de Entorno:

Crea un archivo de entorno (.env o similar) y configúralo con tus credenciales.

Necesitarás las cadenas de conexión a MongoDB (URI) y las credenciales de Cloudinary (Cloud Name, API Key y API Secret), así como una clave secreta para Flask.

Ejecutar el servidor Flask:

Bash

flask run
# O python app.py si tu script principal se llama así
El servidor se ejecutará típicamente en http://127.0.0.1:5000.

3. Configuración del Frontend (Vite/React)
Navega al directorio del cliente:

Bash

cd ../client
Instala las dependencias de Node:

Bash

npm install
# o yarn install
Configuración de Entorno:

Crea un archivo de entorno (.env o similar) para la configuración del cliente.

Asegúrate de configurar la variable que apunte a la URL base de tu API de Flask (por ejemplo, VITE_API_BASE_URL=http://127.0.0.1:5000).

Ejecutar la aplicación React:

Bash

npm run dev
# o yarn dev
La aplicación de React se ejecutará típicamente en http://localhost:5173.

🤝 Contribución
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:

Haz un fork del repositorio.

Crea una rama para tu nueva característica (git checkout -b feature/nueva-caracteristica).

Haz commit de tus cambios (git commit -m 'feat: Añadir nueva característica X').

Empuja la rama (git push origin feature/nueva-caracteristica).

Abre un Pull Request.
