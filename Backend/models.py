from pydantic import BaseModel
from typing import Optional

class Mascotas(BaseModel):
    id: Optional[str] = None
    nombre_mascota: str
    especie: str
    motivo_consulta: str
    vacunado: bool = False

