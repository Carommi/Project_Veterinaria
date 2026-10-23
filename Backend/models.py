from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class Mascota(BaseModel):
    id: Optional[str] = None
    nombre_mascota: str = Field(..., min_length=1, max_length=100)
    especie: str = Field(..., min_length=1, max_length=60)
    motivo_consulta: str = Field(..., min_length=1, max_length=500)
    vacunado: bool

    model_config = ConfigDict(str_strip_whitespace=True)

    @field_validator("nombre_mascota", "especie", "motivo_consulta")
    @classmethod
    def texto_no_vacio(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Este campo no puede estar vacío")
        return value


class UpdateMascota(BaseModel):
    nombre_mascota: Optional[str] = Field(default=None, min_length=1, max_length=100)
    especie: Optional[str] = Field(default=None, min_length=1, max_length=60)
    motivo_consulta: Optional[str] = Field(default=None, min_length=1, max_length=500)
    vacunado: Optional[bool] = None

    model_config = ConfigDict(str_strip_whitespace=True)

    @field_validator("nombre_mascota", "especie", "motivo_consulta")
    @classmethod
    def texto_no_vacio(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and not value.strip():
            raise ValueError("Este campo no puede estar vacío")
        return value
