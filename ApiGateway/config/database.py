from pymongo import MongoClient

class Database:
    @staticmethod
    def get_connection():
        # Configura tu conexión a la base de datos MongoDB
        try:
            client = MongoClient("mongodb://root:example@localhost:27017/?tls=false")
            print(client.user)
            return client.user  # Reemplaza "mydatabase" con el nombre de tu base de datos
        except Exception as e:
            print(e)
