import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    MONGO_URI = os.environ.get("MONGO_URI")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")

    # Puedes añadir otras configuraciones
    DEBUG = os.environ.get("DEBUG", "False").lower() == "true"
