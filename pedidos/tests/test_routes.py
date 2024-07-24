import pytest
from app import app as flask_app
from config import collection
from models.pedido import Pedido
from bson.objectid import ObjectId
from datetime import date

@pytest.fixture
def app():
    flask_app.config['TESTING'] = True
    return flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_create_pedido(client):
    pedido_data = {
        'lista_productos': ['producto1', 'producto2'],
        'fecha': date.today().isoformat(),
        'status': 'pendiente',
        'usuario_id': '12345'
    }
    response = client.post('/pedidos', json=pedido_data)
    assert response.status_code == 201
    assert 'id' in response.json

def test_get_pedido(client):
    pedido_data = Pedido(
        lista_productos=['producto1', 'producto2'],
        fecha=date.today(),
        status='pendiente',
        usuario_id='12345'
    )
    result = collection.insert_one(pedido_data.dict())
    response = client.get(f'/pedidos/{str(result.inserted_id)}')
    assert response.status_code == 200
    assert 'lista_productos' in response.json

def test_get_pedidos(client):
    response = client.get('/pedidos')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_update_pedido(client):
    pedido_data = Pedido(
        lista_productos=['producto1', 'producto2'],
        fecha=date.today(),
        status='pendiente',
        usuario_id='12345'
    )
    result = collection.insert_one(pedido_data.dict())
    update_data = {
        'lista_productos': ['producto1', 'producto2'],
        'fecha': date.today().isoformat(),
        'status': 'completado',
        'usuario_id': '12345'
    }
    response = client.put(f'/pedidos/{str(result.inserted_id)}', json=update_data)
    assert response.status_code == 200
    assert response.json['message'] == 'Pedido actualizado'

def test_delete_pedido(client):
    pedido_data = Pedido(
        lista_productos=['producto1', 'producto2'],
        fecha=date.today(),
        status='pendiente',
        usuario_id='12345'
    )
    result = collection.insert_one(pedido_data.dict())
    response = client.delete(f'/pedidos/{str(result.inserted_id)}')
    assert response.status_code == 200
    assert response.json['message'] == 'Pedido eliminado'
