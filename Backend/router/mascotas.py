from fastapi import APIRouter, HTTPException
from bson import ObjectId

from database import (
    create_mascota,
    delete_mascota,
    get_mascota_por_id,
    get_mascota_por_nombre,
    get_todas_mascotas,
    update_mascota,
)
from models import Mascota, UpdateMascota


mascotas_router = APIRouter(prefix="/api/mascotas", tags=["Mascotas"])


@mascotas_router.get("", response_model=list[Mascota])
async def listar_mascotas():
    return await get_todas_mascotas()


@mascotas_router.post("", response_model=Mascota)
async def crear_mascota(mascota: Mascota):
    datos = mascota.model_dump(exclude={"id"})
    if await get_mascota_por_nombre(datos["nombre_mascota"]):
        raise HTTPException(status_code=400, detail="Ya existe una mascota con ese nombre")
    return await create_mascota(datos)


@mascotas_router.get("/{mascota_id}", response_model=Mascota)
async def obtener_mascota(mascota_id: str):
    if not ObjectId.is_valid(mascota_id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")
    mascota = await get_mascota_por_id(mascota_id)
    if mascota is None:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    return mascota


@mascotas_router.put("/{mascota_id}", response_model=Mascota)
async def editar_mascota(mascota_id: str, cambios: UpdateMascota):
    if not ObjectId.is_valid(mascota_id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")
    actual = await get_mascota_por_id(mascota_id)
    if actual is None:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    datos = cambios.model_dump(exclude_unset=True)
    if "nombre_mascota" in datos:
        existente = await get_mascota_por_nombre(datos["nombre_mascota"])
        if existente and existente["id"] != mascota_id:
            raise HTTPException(status_code=400, detail="Ya existe una mascota con ese nombre")
    return await update_mascota(mascota_id, datos)


@mascotas_router.delete("/{mascota_id}")
async def eliminar_mascota(mascota_id: str):
    if not ObjectId.is_valid(mascota_id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")
    if not await delete_mascota(mascota_id):
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    return {"message": "Mascota eliminada satisfactoriamente"}
