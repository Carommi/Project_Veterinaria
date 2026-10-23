from decouple import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router.mascotas import mascotas_router


app = FastAPI()

frontend_url = config("FRONTEND_URL", default="http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def inicio():
    return {"mensaje": "Bienvenido a la veterinaria"}


app.include_router(mascotas_router)
