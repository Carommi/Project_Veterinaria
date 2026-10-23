from contextlib import asynccontextmanager

from decouple import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import cliente, verificar_conexion
from router.mascotas import mascotas_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    await verificar_conexion()
    yield
    cliente.close()


app = FastAPI(title="API Veterinaria - Mascotas", lifespan=lifespan)
frontend_url = config("FRONTEND_URL", default="http://localhost:5173").rstrip("/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def bienvenida():
    return {"message": "API de Veterinaria lista", "recurso": "/api/mascotas"}


app.include_router(mascotas_router)
