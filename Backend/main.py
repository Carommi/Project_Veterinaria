from fastapi import FastAPI, HTTPException
from database import get_todas_mascotas, agregar_mascota, get_mascota_por_id
from models import Mascotas

app = FastAPI()

@app.get('/')
def welcome():
    return {'Mensaje: Bienvenido a mi Veterinaria'}

@app.get('/api/mascotas')
async def get_mascotas():
    mascotas = await get_todas_mascotas()
    return mascotas

@app.post('/api/mascotas')
async def save_mascota(mascotas:Mascotas):
    mascota_existente = await get_mascota_por_id(mascotas.id)

    if mascota_existente:
        raise HTTPException(status_code=400, detail="El id de la mascota ya existe")

    dict_mascota = mascotas.model_dump()
    if dict_mascota.get('id') is None:
        del dict_mascota['id']

    responsive = await agregar_mascota(dict_mascota)
    return responsive

@app.get('/api/mascotas/{id}')
async def get_mascotas(id: str):
    Mascotas = await get_mascota_por_id(id)
    if Mascotas:
        return Mascotas
    raise HTTPException(404, f'mascota {id} no encontrada')

@app.put('/api/mascotas/{id}')
async def update_mascotas():
    return 'Actualizar datos de mascota'

@app.delete('/api/mascotas/{id}')
async def delete_mascota():
    return 'Borrar mascota del sistema'