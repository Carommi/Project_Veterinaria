from motor.motor_asyncio import AsyncIOMotorClient
from models import Mascotas

cliente = AsyncIOMotorClient('mongodb://localhost:27017')
database = cliente.veterinariadatabase
coleccion = database.mascotas


async def agregar_mascota(mascotas):
    nueva_mascota = await coleccion.insert_one(mascotas)
    mascota_agregada = await coleccion.find_one({'_id': nueva_mascota.inserted_id})
    mascota_agregada['_id'] = str(mascota_agregada['_id'])
    
    return mascota_agregada

async def get_todas_mascotas():
    mascotas = []
    cursor = coleccion.find({})
    async for document in cursor:
        mascotas.append(Mascotas(**document))
    return mascotas

async def update(id:str, mascotas):
    await coleccion.update_one({'_id': id}, {'$set': mascotas})
    document = await coleccion.find_one({'_id': id})
    return document

async def delete_mascota(id:str):
    await coleccion.delete_one({'_id': id})
    return True

async def get_mascota_por_id(id: str):
    Mascotas = await coleccion.find_one({'id': id})
    return Mascotas
