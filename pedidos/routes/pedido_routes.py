from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from config import collection
from models.pedido import Pedido
from bson.objectid import ObjectId

pedido_bp = Blueprint('pedido_bp', __name__)

@pedido_bp.route('/pedidos', methods=['POST'])
def create_pedido():
    try:
        data = request.get_json()
        pedido = Pedido(**data)
        result = collection.insert_one(pedido.dict())
        return jsonify({'id': str(result.inserted_id)}), 201
    except ValidationError as e:
        return jsonify({'error': e.errors()}), 400

@pedido_bp.route('/pedidos/<pedido_id>', methods=['GET'])
def get_pedido(pedido_id):
    try:
        pedido = collection.find_one({'_id': ObjectId(pedido_id)})
        if pedido:
            pedido['_id'] = str(pedido['_id'])
            return jsonify(pedido), 200
        else:
            return jsonify({'error': 'Pedido no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pedido_bp.route('/pedidos', methods=['GET'])
def get_pedidos():
    try:
        pedidos = list(collection.find())
        for pedido in pedidos:
            pedido['_id'] = str(pedido['_id'])
        return jsonify(pedidos), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pedido_bp.route('/pedidos/<pedido_id>', methods=['PUT'])
def update_pedido(pedido_id):
    try:
        data = request.get_json()
        pedido = Pedido(**data)
        result = collection.update_one(
            {'_id': ObjectId(pedido_id)},
            {'$set': pedido.dict()}
        )
        if result.matched_count:
            return jsonify({'message': 'Pedido actualizado'}), 200
        else:
            return jsonify({'error': 'Pedido no encontrado'}), 404
    except ValidationError as e:
        return jsonify({'error': e.errors()}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@pedido_bp.route('/pedidos/<pedido_id>', methods=['DELETE'])
def delete_pedido(pedido_id):
    try:
        result = collection.delete_one({'_id': ObjectId(pedido_id)})
        if result.deleted_count:
            return jsonify({'message': 'Pedido eliminado'}), 200
        else:
            return jsonify({'error': 'Pedido no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
