# E-commerce Platform - Documentación Técnica Completa

Este proyecto es un sistema de comercio electrónico full-stack, separado en un backend basado en Python (FastAPI) y un frontend interactivo en React (Vite). El sistema cuenta con dos módulos principales: **Tienda para el Cliente** y **Panel Administrativo (Dashboard)**, conectados en tiempo real mediante una API RESTful y respaldados por una base de datos relacional SQLite.

---

## 1. Arquitectura del Sistema

El proyecto sigue una arquitectura Cliente-Servidor dividida en dos directorios principales:

### `frontend/` (Cliente)
Aplicación Single Page Application (SPA) responsiva y moderna.
- **Frameworks:** React 18, Vite (bundler), TypeScript.
- **Estilos:** TailwindCSS (para diseño utility-first), Framer Motion (para micro-animaciones dinámicas).
- **Enrutamiento:** React Router DOM (Manejo de rutas de cliente y administrador).
- **Gestión de Estado:** Context API (`StoreContext.tsx`) que maneja el carrito, inicio de sesión y simulación de flujos en la tienda.
- **Iconografía:** Lucide React.
- **Estructura de Carpetas:**
  - `src/app/components`: Componentes reutilizables de UI (botones neon, cards glassmorphism, inputs).
  - `src/app/pages`: Vistas divididas en públicas (`Home`, `Catalog`, `Checkout`) y privadas (`admin/Dashboard`, `admin/Products`, `admin/Orders`).
  - `src/app/layouts`: Envoltorios de diseño (Ej. Layout de cliente con Navbar/Footer y Layout de Admin con Sidebar).

### `backend/` (Servidor API)
Servicio de alta concurrencia que expone los endpoints RESTful para el consumo del frontend.
- **Framework:** FastAPI (Python 3.9+).
- **ORM & Base de Datos:** SQLAlchemy con SQLite (`database.db`).
- **Validación de Datos:** Pydantic (esquemas fuertemente tipados).
- **Estructura de Archivos:**
  - `main.py`: Punto de entrada de Uvicorn y definición de rutas (endpoints).
  - `models.py`: Modelos ORM de SQLAlchemy que representan las tablas en SQLite.
  - `schemas.py`: Clases Pydantic que validan las peticiones de entrada y salida (Serialización).
  - `database.py`: Configuración de la conexión a la base de datos `database.db`.
  - `init_db.py`: Script para inicializar la base de datos y poblar con datos dummy/mock si está vacía.

---

## 2. Esquema de Base de Datos (SQLite)

El sistema utiliza SQLite para la persistencia. Las tablas principales definidas en `models.py` son:

- **users:** Almacena usuarios (ID, name, email, password, role). Los roles incluyen `admin` y `customer`.
- **products:** Almacena la información de los artículos (SKU, nombre, descripción, precio, categoría, marca, stock, etc.).
- **categories:** Categorías para filtrar en tienda (ID, nombre, ícono).
- **brands:** Marcas asociadas a los productos.
- **orders:** Almacena la información transaccional de compras (ID, fecha, datos de envío del cliente, montos, y estado del pedido: `pending`, `processing`, `shipped`, `delivered`).
- **order_items:** Almacena la relación de los productos y cantidades exactas adquiridas dentro de un `order`.

---

## 3. Endpoints de la API (Backend)

La API REST corre por defecto en el puerto `8000`. Accede a la documentación interactiva Swagger en: `http://localhost:8000/docs`.

### Autenticación
- `POST /api/login`: Valida email y password. Devuelve la información del usuario si el login es exitoso.

### Catálogo (Lectura)
- `GET /api/categories`: Retorna la lista de categorías activas.
- `GET /api/brands`: Retorna la lista de marcas.

### CRUD Productos
- `GET /api/products`: Lista todos los productos.
- `GET /api/products/{id}`: Detalle de un producto específico.
- `POST /api/products`: Crea un nuevo producto (Admin).
- `PUT /api/products/{id}`: Actualiza un producto existente (Admin).
- `DELETE /api/products/{id}`: Elimina un producto (Admin).

### Pedidos (Orders)
- `POST /api/orders`: Crea un nuevo pedido desde el Checkout. **Descuenta automáticamente el stock** de los productos solicitados y genera registros en `order_items`. Lanza error 400 si el stock es insuficiente.
- `GET /api/orders`: Obtiene todos los pedidos (para el panel Administrativo).
- `PATCH /api/orders/{id}/status`: Actualiza únicamente el estado del pedido (ej. de "pending" a "delivered").
- `PUT /api/orders/{id}`: Actualiza información del cliente en un pedido (Admin).
- `DELETE /api/orders/{id}`: Borra un pedido por completo y sus ítems (Admin).

---

## 4. Requisitos e Instalación

### Requisitos
- **Node.js** (versión 18 o superior)
- **Python** (versión 3.9 o superior)

### 4.1. Iniciar el Backend
1. Navega a la carpeta del backend: `cd backend`
2. Activa el entorno virtual:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
3. Instala dependencias: `pip install -r requirements.txt`
4. Inicializa los datos (opcional, si `database.db` no existe): `python init_db.py`
5. Ejecuta el servidor en modo desarrollo: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
   *(Nota: `host="0.0.0.0"` permite el acceso desde tu red local o servicios de túnel).*

### 4.2. Iniciar el Frontend
1. Abre otra terminal y navega al frontend: `cd frontend`
2. Instala las dependencias: `npm install`
3. Inicia el entorno de Vite: `npm run dev`
4. Accede en el navegador a `http://localhost:5173` (o la IP local mostrada). 
   *(Nota: Se configuró `allowedHosts` en vite.config.ts para permitir conexiones mediante túneles Ngrok).*

---

## 5. Credenciales de Prueba (Por Defecto)

La base de datos viene inicializada con usuarios de prueba. Puedes usarlos para testear el sistema:

| Rol | Email | Contraseña | Acceso a |
|---|---|---|---|
| Administrador | `admin@ejemplo.com` | `admin` | Panel Admin / Tienda |
| Cliente | `cliente@ejemplo.com` | `123` | Tienda Cliente |

Si en el futuro deseas limpiar la base de datos y volver a crear los datos originales de prueba, elimina el archivo `database.db` y vuelve a correr `python init_db.py`.

---

## 6. Integración y Flujos Principales

- **Compra (Checkout):** Cuando un usuario entra al carrito de compras y realiza el pedido, el frontend llama a `POST /api/orders`. El backend procesa cada elemento, verifica el stock en `products` y si todo es válido, guarda la orden en la base de datos y deduce el stock.
- **Gestión de Stock:** El panel administrativo (`Orders.tsx` y `Products.tsx`) consulta directamente al backend. Cuando el stock llega a `0`, el frontend de la tienda mostrará el producto como "Agotado".
- **Estado de Pedidos:** Desde el panel de Control (Dashboard > Pedidos), los administradores pueden cambiar los estados del pedido (Pendiente, En Proceso, Enviado, Entregado). Esto impacta directamente la base de datos mediante el endpoint PATCH de estados.
