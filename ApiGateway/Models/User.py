from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    """
    Clase que representa un usuario.

    Atributos:
        user_id (str): ID del usuario.
        user_name (str): Nombre del usuario.
        user_score (float): Puntuación del usuario.
        user_email (str): Correo electrónico del usuario.
    """
    user_id: str
    user_name: str
    user_role: int
    user_email: str

class UserDB(User):
    """
    Clase que representa un usuario en la base de datos, hereda de la clase User.

    Atributos:
        user_password (str): Contraseña del usuario en la base de datos.
    """
    user_password: str

class UserBase(BaseModel):
    """
    Clase base que define los campos comunes para la creación y actualización de usuarios.

    Atributos:
        user_name (str): Nombre del usuario.
        user_score (float): Puntuación del usuario.
        user_email (EmailStr): Correo electrónico del usuario.
    """
    user_name: str
    user_email: str

class UserCreate(UserBase):
    """
    Clase que define los campos necesarios para la creación de un usuario.

    Atributos:
        user_password (str): Contraseña del usuario.
    """
    user_password: str

class UserUpdate(UserBase):
    """
    Clase que define los campos opcionales para la actualización de un usuario.

    Atributos opcionales:
        user_password (str): Contraseña del usuario.
    """
    user_password: Optional[str] = None