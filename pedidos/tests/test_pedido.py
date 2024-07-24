from datetime import date
from pydantic import ValidationError
import pytest
from models.pedido import Pedido

def test_pedido_creation():
    pedido_data = {
        'lista_productos': ['producto1', 'producto2'],
        'fecha': date.today(),
        'status': 'pendiente',
        'usuario_id': '12345'
    }
    pedido = Pedido(**pedido_data)
    assert pedido.lista_productos == pedido_data['lista_productos']
    assert pedido.fecha == pedido_data['fecha']
    assert pedido.status == pedido_data['status']
    assert pedido.usuario_id == pedido_data['usuario_id']

def test_pedido_creation_invalid_data():
    with pytest.raises(ValidationError):
        Pedido(lista_productos='no es una lista', fecha='fecha inválida', status='pendiente', usuario_id='12345')
