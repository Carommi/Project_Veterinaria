from bson import ObjectId
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient


# Lee los datos de conexion desde el archivo .env.
MONGODB_URL = config("MONGODB_URL", default="mongodb://localhost:27017")
DATABASE_NAME = config("DATABASE_NAME", default="veterinaria")

cliente = AsyncIOMotorClient(MONGODB_URL)
base_datos = cliente[DATABASE_NAME]
coleccion = base_datos["mascotas"]


def preparar_mascota(mascota):
    """Convierte el _id de MongoDB a un id de texto para la API."""
    if mascota:
        mascota["id"] = str(mascota["_id"])
        del mascota["_id"]
    return mascota


async def obtener_mascotas():
    mascotas = []
    cursor = coleccion.find({})

    async for mascota in cursor:
        mascotas.append(preparar_mascota(mascota))

    return mascotas


async def obtener_mascota(mascota_id):
    mascota = await coleccion.find_one({"_id": ObjectId(mascota_id)})
    return preparar_mascota(mascota)


async def buscar_mascota_por_nombre(nombre):
    mascota = await coleccion.find_one({"nombre_mascota": nombre})
    return preparar_mascota(mascota)


async def crear_mascota(datos):
    resultado = await coleccion.insert_one(datos)
    mascota = await coleccion.find_one({"_id": resultado.inserted_id})
    return preparar_mascota(mascota)


async def actualizar_mascota(mascota_id, datos):
    await coleccion.update_one(
        {"_id": ObjectId(mascota_id)},
        {"$set": datos},
    )
    return await obtener_mascota(mascota_id)


async def eliminar_mascota(mascota_id):
    resultado = await coleccion.delete_one({"_id": ObjectId(mascota_id)})
    return resultado.deleted_count == 1
