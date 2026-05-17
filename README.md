# E-commerce Platform

Este proyecto es un sistema de comercio electrónico full-stack, separado en un backend de Python (FastAPI) y un frontend en React (Vite).

## Requisitos Previos
Para poder ejecutar el proyecto necesitas tener instalado en tu computadora:
1. **Node.js** (versión 18 o superior) - para ejecutar el frontend.
2. **Python** (versión 3.9 o superior) - para ejecutar el backend.

---

## 1. Ejecutar el Backend (FastAPI + SQLite)

El backend ya tiene su entorno virtual creado y la base de datos `database.db` inicializada con todos los ejemplos. Para arrancar el servidor:

1. Abre una terminal (PowerShell o CMD) y entra a la carpeta del proyecto.
2. Navega a la carpeta del backend:
   ```bash
   cd "backend"
   ```
3. Activa el entorno virtual:
   - **En Windows:**
     ```bash

     .\venv\Scripts\activate

     ```
   *(Sabrás que está activado si ves un `(venv)` al inicio de tu línea de comandos).*
4. Instala las dependencias (si es que no están ya instaladas):
   ```bash

   pip install -r requirements.txt

   ```
5. Inicia el servidor de FastAPI:
   ```bash

   uvicorn main:app --reload --port 8000

   ```
6. Puedes comprobar que funciona abriendo tu navegador en: [http://localhost:8000/docs](http://localhost:8000/docs). Allí verás la interfaz interactiva de la API con los endpoints de productos, categorías y marcas.

---

## 2. Ejecutar el Frontend (React + Vite)

Abre **otra ventana de terminal** distinta (para no cerrar el backend) y sigue estos pasos:

1. Navega a la carpeta del frontend:
   ```bash
   cd "frontend"
   ```
2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. El terminal te mostrará una dirección, usualmente `http://localhost:5173`. Abre esa URL en tu navegador para ver la interfaz gráfica.

---

## 3. Base de Datos (SQLite)

La base de datos se encuentra en el archivo `backend/database.db`.
**Nota:** Ya he ejecutado por ti el archivo `init_db.py`, por lo que los productos y categorías de ejemplo ya existen en la base de datos. 
Si en el futuro deseas limpiar la base de datos y volver a crear los datos originales, simplemente elimina el archivo `database.db` y ejecuta:
```bash
python init_db.py
```
*(Asegúrate de tener el entorno virtual activado cuando lo hagas).*

---

## 4. Credenciales de Prueba

El sistema cuenta con dos usuarios creados por defecto para que puedas probar tanto el panel de cliente como el de administrador:

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | `admin@ejemplo.com` | `admin` |
| Cliente | `cliente@ejemplo.com` | `123` |

Puedes probar el inicio de sesión enviando un POST a `http://localhost:8000/api/login` con este JSON:
```json
{
  "email": "admin@ejemplo.com",
  "password": "admin"
}
```
