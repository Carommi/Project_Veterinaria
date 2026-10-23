# Backend de Veterinaria

API REST para gestionar **Mascotas** con FastAPI y MongoDB.

## Preparar el entorno

Desde la carpeta raiz del proyecto, activa el entorno e instala las dependencias:

```powershell
.\Backend\.venv\Scripts\Activate.ps1
python -m pip install -r .\Backend\requirements.txt
python -m pip list
```

El segundo comando muestra en la terminal que paquetes ya estan instalados. Para las capturas, incluye tambien el resultado de `pip list`.

Configura `.env` con los valores de `.env.example`. MongoDB debe estar iniciado y la URL debe apuntar a tu instancia.

## Iniciar la API

```powershell
cd .\Backend
uvicorn main:app --reload
```

La API queda en `http://localhost:8000` y la documentación interactiva en `http://localhost:8000/docs`.

## Recurso

Las rutas CRUD usan `/api/mascotas`. Cada registro requiere `nombre_mascota`, `especie`, `motivo_consulta` y `vacunado`. Los nombres de mascota no se pueden repetir.
