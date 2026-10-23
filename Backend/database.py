import re
from typing import Any, Optional

from bson import ObjectId
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient


MONGODB_URL = config("MONGODB_URL", default="mongodb://localhost:27017")
DATABASE_NAME = config("DATABASE_NAME", default="veterinaria")
cliente = AsyncIOMotorClient(MONGODB_URL, serverSelectionTimeoutMS=5000)
database = cliente[DATABASE_NAME]
coleccion = database["mascotas"]


def serializar_mascota(documento: Optional[dict[str, Any]]) -> Optional[dict[str, Any]]:
    if documento is None:
        return None
    return {
        "id": str(documento["_id"]),
        "nombre_mascota": documento.get("nombre_mascota"),
        "especie": documento.get("especie"),
        "motivo_consulta": documento.get("motivo_consulta"),
        "vacunado": documento.get("vacunado", False),
    }


async def verificar_conexion() -> None:
    await cliente.admin.command("ping")


async def get_todas_mascotas() -> list[dict[str, Any]]:
    return [serializar_mascota(documento) async for documento in coleccion.find({})]


async def get_mascota_por_id(mascota_id: str) -> Optional[dict[str, Any]]:
    return serializar_mascota(await coleccion.find_one({"_id": ObjectId(mascota_id)}))


async def get_mascota_por_nombre(nombre_mascota: str) -> Optional[dict[str, Any]]:
    return serializar_mascota(
        await coleccion.find_one({"nombre_mascota": {"$regex": f"^{re.escape(nombre_mascota)}$", "$options": "i"}})
    )


async def create_mascota(datos: dict[str, Any]) -> dict[str, Any]:
    resultado = await coleccion.insert_one(datos)
    return serializar_mascota(await coleccion.find_one({"_id": resultado.inserted_id}))


async def update_mascota(mascota_id: str, datos: dict[str, Any]) -> Optional[dict[str, Any]]:
    if not datos:
        return await get_mascota_por_id(mascota_id)
    await coleccion.update_one({"_id": ObjectId(mascota_id)}, {"$set": datos})
    return await get_mascota_por_id(mascota_id)


async def delete_mascota(mascota_id: str) -> bool:
    resultado = await coleccion.delete_one({"_id": ObjectId(mascota_id)})
    return resultado.deleted_count == 1
