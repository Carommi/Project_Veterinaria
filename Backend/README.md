# Backend de Veterinaria

API REST para gestionar **Mascotas** con FastAPI y MongoDB.

## Preparar el entorno

Desde esta carpeta, crea y activa el entorno virtual e instala las dependencias:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Configura `.env` con los valores de `.env.example`. MongoDB debe estar iniciado y la URL debe apuntar a tu instancia.

## Iniciar la API

```powershell
uvicorn main:app --reload
```

La API queda en `http://localhost:8000` y la documentación interactiva en `http://localhost:8000/docs`.

## Recurso

Las rutas CRUD usan `/api/mascotas`. Cada registro requiere `nombre_mascota`, `especie`, `motivo_consulta` y `vacunado`. Los nombres de mascota no se pueden repetir.
