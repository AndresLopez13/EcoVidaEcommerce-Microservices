from pydantic import BaseModel, ValidationError
from datetime import date
from typing import List

class Pedido(BaseModel):
    lista_productos: List[str]
    fecha: date
    status: str
    usuario_id: str

    def dict(self, **kwargs):
        d = super().dict(**kwargs)
        d['fecha'] = d['fecha'].isoformat()  # Convertir fecha a string ISO 8601
        return d
