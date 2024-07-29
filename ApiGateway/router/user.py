from fastapi import HTTPException, status
from uuid import UUID, uuid4
from passlib.context import CryptContext
from fastapi import APIRouter
from pymongo import MongoClient
from Models.User import User, UserCreate, UserDB, UserUpdate
from config.database import Database

api_router = APIRouter()

# Configura tu conexión a MongoDB
# client = MongoClient("mongodb+srv://incedillo:U2vmSLzDmJNCT4aJ@cluster0.bm5ujfv.mongodb.net/?retryWrites=true&w=majority")
# Reemplaza "mydatabase" con el nombre de tu base de datos
db_connection = Database.get_connection()
# Reemplaza "user_collection" con el nombre de tu colección
user_collection = db_connection.user_collection
crypt = CryptContext(schemes=["bcrypt"], deprecated="auto")


@api_router.post("/createuser", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    try:
        # Verifica si el usuario ya existe en MongoDB
        current_user = user_collection.find_one({"user_name": user.user_name})
        if current_user is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="User exists"
            )

        # Asigna un nuevo ID de usuario
        user_id = str(uuid4())

        # Inserta el usuario en MongoDB
        user_dict = user.dict()
        user_dict["user_id"] = user_id
        user_dict["user_password"] = crypt.encrypt(user.user_password)
        user_dict["user_role"] = 0
        user_collection.insert_one(user_dict)

        # Puedes seguir insertando en otras colecciones o realizar otras operaciones en MongoDB aquí

        return UserDB(**user_dict)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not create user: " +
            str(e)
        )
