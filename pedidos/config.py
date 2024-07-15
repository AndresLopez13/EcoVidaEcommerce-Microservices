from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['pedidos_db']
collection = db['pedidos']


# import os

# class Config:
#     MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/pedidos_db')
