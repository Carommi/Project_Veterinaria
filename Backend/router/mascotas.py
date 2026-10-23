from bson import ObjectId
from fastapi import APIRouter, HTTPException

from database import (
    actualizar_mascota,
    buscar_mascota_por_nombre,
    crear_mascota,
    eliminar_mascota,
    obtener_mascota,
    obtener_mascotas,
)
from models import ActualizarMascota, Mascota


mascotas_router = APIRouter(prefix="/api/mascotas", tags=["Mascotas"])


@mascotas_router.get("", response_model=list[Mascota])
async def listar_mascotas():
    return await obtener_mascotas()


@mascotas_router.post("", response_model=Mascota)
async def guardar_mascota(mascota: Mascota):
    datos = mascota.model_dump(exclude={"id"})

    mascota_existente = await buscar_mascota_por_nombre(datos["nombre_mascota"])
    if mascota_existente:
        raise HTTPException(status_code=400, detail="Ya existe una mascota con ese nombre")

    return await crear_mascota(datos)


@mascotas_router.get("/{mascota_id}", response_model=Mascota)
async def consultar_mascota(mascota_id: str):
    if not ObjectId.is_valid(mascota_id):
        raise HTTPException(status_code=400, detail="ID invalido")

    mascota = await obtener_mascota(mascota_id)
    if not mascota:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    return mascota


@mascotas_router.put("/{mascota_id}", response_model=Mascota)
async def editar_mascota(mascota_id: str, cambios: ActualizarMascota):
    if not ObjectId.is_valid(mascota_id):
        raise HTTPException(status_code=400, detail="ID invalido")

    mascota = await obtener_mascota(mascota_id)
    if not mascota:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    datos = cambios.model_dump(exclude_unset=True)
    if "nombre_mascota" in datos:
        duplicada = await buscar_mascota_por_nombre(datos["nombre_mascota"])
        if duplicada and duplicada["id"] != mascota_id:
            raise HTTPException(status_code=400, detail="Ya existe una mascota con ese nombre")

    return await actualizar_mascota(mascota_id, datos)


@mascotas_router.delete("/{mascota_id}")
async def borrar_mascota(mascota_id: str):
    if not ObjectId.is_valid(mascota_id):
        raise HTTPException(status_code=400, detail="ID invalido")

    borrada = await eliminar_mascota(mascota_id)
    if not borrada:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    return {"mensaje": "Mascota eliminada"}
