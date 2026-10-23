from typing import Optional

from pydantic import BaseModel, Field


class Mascota(BaseModel):
    id: Optional[str] = None
    nombre_mascota: str = Field(min_length=1)
    especie: str = Field(min_length=1)
    motivo_consulta: str = Field(min_length=1)
    vacunado: bool


class ActualizarMascota(BaseModel):
    
    nombre_mascota: Optional[str] = Field(default=None, min_length=1)
    especie: Optional[str] = Field(default=None, min_length=1)
    motivo_consulta: Optional[str] = Field(default=None, min_length=1)
    vacunado: Optional[bool] = None
