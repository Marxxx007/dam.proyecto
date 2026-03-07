# APIARIUM — Gestor de Colmenas
## Proyecto Fin de Ciclo — Desarrollo de Aplicaciones Multiplataforma (DAM)
**Curso:** 2024-2025
**Alumna:** Marcela
**Fecha:** Marzo 2025

---

## Índice
1. [Introducción](#1-introducción)
2. [Recursos necesarios](#2-recursos-necesarios)
3. [Ciclo de Vida del Software](#3-ciclo-de-vida-del-software)
   - 3.1 [Análisis de Requisitos](#31-análisis-de-requisitos)
   - 3.2 [Diseño](#32-diseño)
   - 3.3 [Implementación](#33-implementación)
   - 3.4 [Manual de Usuario](#34-manual-de-usuario)
4. [Propuestas de Mejora](#4-propuestas-de-mejora)
5. [Valoración Personal](#5-valoración-personal)
6. [Fuentes Consultadas](#6-fuentes-consultadas)

---

## 1. Introducción

### 1.1 Caso técnico: La apicultura digital

La apicultura es una actividad ganadera con siglos de historia que, sin embargo, arrastra una brecha digital significativa. La mayoría de apicultores lleva el seguimiento de sus colmenas en cuadernos físicos o, en el mejor caso, en hojas de cálculo. Esto provoca:

- **Pérdida de datos** por deterioro o extravío del soporte físico.
- **Dificultad de análisis**: correlacionar producción, enfermedades y tratamientos a lo largo del tiempo requiere trabajo manual.
- **Falta de trazabilidad**: imposibilidad de cumplir de forma sencilla con la normativa de trazabilidad de la miel (Real Decreto 1049/2003).
- **Gestión reactiva**: sin alertas ni histórico digitalizado, los problemas sanitarios (especialmente *Varroa destructor*) se detectan tarde.

**Apiarium** es una aplicación web que digitaliza esta gestión: permite registrar cada colmena, su posición geográfica, las recolecciones de miel, las inspecciones sanitarias y los tratamientos aplicados, todo desde cualquier dispositivo con navegador.

### 1.2 Viabilidad

| Factor | Análisis |
|--------|----------|
| **Técnica** | Stack maduro (React, Node.js, PostgreSQL). Herramientas bien documentadas con gran comunidad. Sin dependencias críticas de hardware especial. |
| **Económica** | Supabase ofrece tier gratuito suficiente para desarrollo y uso inicial. Google Maps tiene cuota gratuita mensual. Coste de servidor mínimo (pueden usarse servicios PaaS gratuitos como Render). |
| **Temporal** | Proyecto acotado a un ciclo escolar. Se adopta un MVP funcional con las 4 entidades principales. |
| **Legal** | Datos no sensibles (no se gestionan datos personales de terceros). La clave de API de Google Maps se protege mediante restricciones por HTTP referrer. |

---

## 2. Recursos Necesarios

### 2.1 Medios técnicos

**Hardware:**
- Ordenador de desarrollo (cualquier equipo moderno con 8 GB RAM)
- Conexión a Internet

**Software:**
- Node.js v20 LTS
- npm v10+
- Visual Studio Code
- Git
- Navegador moderno (Chrome/Firefox/Safari)

**Servicios en la nube:**
- **Supabase** (https://supabase.com): Base de datos PostgreSQL gestionada + API REST automática. Plan Free incluye 500 MB de almacenamiento y 2 GB de transferencia mensual.
- **Google Maps JavaScript API**: Para visualización geográfica de colmenas. Se requiere una clave de API con billing habilitado; sin embargo, el límite gratuito mensual (28.000 cargas de mapa dinámica) es suficiente para un uso educativo.

### 2.2 Clave Google Maps API

1. Acceder a [Google Cloud Console](https://console.cloud.google.com).
2. Crear un nuevo proyecto o seleccionar uno existente.
3. Habilitar **Maps JavaScript API**.
4. Ir a *Credenciales* → *Crear credenciales* → *Clave de API*.
5. Restringir la clave a los dominios permitidos (p.ej. `localhost:5173`).
6. Copiar la clave al fichero `frontend/.env`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
   ```

### 2.3 Presupuesto estimado

| Concepto | Coste mensual |
|----------|--------------|
| Supabase Free tier | 0 € |
| Google Maps API (uso educativo) | 0 € |
| Hosting frontend (Vercel/Netlify Free) | 0 € |
| Hosting backend (Render Free) | 0 € |
| **Total** | **0 €** |

Para un despliegue profesional con mayor carga, el coste estimado sería ~15-30 €/mes.

---

## 3. Ciclo de Vida del Software

### 3.1 Análisis de Requisitos

#### Requisitos Funcionales

| ID | Requisito |
|----|-----------|
| RF-01 | El sistema permitirá registrar colmenas con: nombre, apiario, posición GPS, fecha de instalación, estado, raza y notas. |
| RF-02 | El sistema permitirá editar y eliminar colmenas. |
| RF-03 | El sistema mostrará las colmenas en un mapa interactivo con marcadores de color según su estado. |
| RF-04 | El mapa mostrará una ventana de información (InfoWindow) al hacer clic en un marcador. |
| RF-05 | El formulario de colmena incluirá un mini mapa para fijar la posición haciendo clic. |
| RF-06 | El sistema permitirá registrar recolecciones de miel por colmena (fecha, kg, calidad, notas). |
| RF-07 | El sistema permitirá registrar inspecciones sanitarias (fecha, estado reina, población, conteo varroa, notas). |
| RF-08 | El sistema permitirá registrar tratamientos (producto, fechas inicio/fin, dosis, motivo, notas). |
| RF-09 | El Dashboard mostrará estadísticas generales: total colmenas, producción acumulada, número de inspecciones y tratamientos activos. |
| RF-10 | El Dashboard incluirá un gráfico de barras de producción mensual. |
| RF-11 | La vista de detalle de colmena mostrará sus registros históricos organizados en pestañas. |
| RF-12 | Las vistas globales (Recolecciones, Inspecciones, Tratamientos) permitirán filtrar por colmena. |

#### Requisitos No Funcionales

| ID | Requisito |
|----|-----------|
| RNF-01 | **Usabilidad**: Interfaz responsive que funcione en dispositivos móviles y escritorio. |
| RNF-02 | **Rendimiento**: Tiempo de carga inicial inferior a 3 segundos en conexión 4G. |
| RNF-03 | **Disponibilidad**: El backend expone endpoint `/health` para monitorización. |
| RNF-04 | **Seguridad**: Las credenciales (claves de API, URL de Supabase) se almacenan en variables de entorno, nunca en el código fuente. |
| RNF-05 | **Mantenibilidad**: Código modular; cada entidad tiene su propio fichero de rutas en el backend y sus propios componentes en el frontend. |
| RNF-06 | **Escalabilidad**: La arquitectura de 3 capas permite sustituir Supabase por otro proveedor sin tocar el frontend. |

### 3.2 Diseño

#### Casos de Uso

```
Actor: Apicultor

[Gestión de Colmenas]
  UC-01: Listar colmenas
  UC-02: Crear colmena (incluye fijar posición en mapa)
  UC-03: Editar colmena
  UC-04: Eliminar colmena
  UC-05: Ver detalle de colmena

[Mapa]
  UC-06: Visualizar todas las colmenas en el mapa
  UC-07: Consultar info rápida al hacer clic en marcador

[Recolecciones]
  UC-08: Registrar recolección
  UC-09: Listar recolecciones (por colmena o globales)
  UC-10: Eliminar recolección

[Inspecciones]
  UC-11: Registrar inspección sanitaria
  UC-12: Listar inspecciones
  UC-13: Eliminar inspección

[Tratamientos]
  UC-14: Registrar tratamiento
  UC-15: Listar tratamientos (con indicador de "en curso")
  UC-16: Eliminar tratamiento

[Dashboard]
  UC-17: Consultar resumen estadístico
  UC-18: Ver gráfico de producción mensual
```

#### Diagrama Entidad-Relación

```
colmenas
├── id (PK, UUID)
├── nombre (TEXT, NOT NULL)
├── apiario (TEXT, NOT NULL)
├── lat (FLOAT)
├── lng (FLOAT)
├── fecha_instalacion (DATE)
├── estado (TEXT: activa|revision|inactiva)
├── raza (TEXT)
├── notas (TEXT)
└── created_at (TIMESTAMPTZ)
    │
    ├──< recolecciones
    │     ├── id (PK, UUID)
    │     ├── colmena_id (FK)
    │     ├── fecha (DATE)
    │     ├── kg (FLOAT)
    │     ├── calidad (TEXT)
    │     └── notas (TEXT)
    │
    ├──< inspecciones
    │     ├── id (PK, UUID)
    │     ├── colmena_id (FK)
    │     ├── fecha (DATE)
    │     ├── estado_reina (TEXT)
    │     ├── poblacion (TEXT)
    │     ├── varroa_count (INT)
    │     └── notas (TEXT)
    │
    └──< tratamientos
          ├── id (PK, UUID)
          ├── colmena_id (FK)
          ├── fecha (DATE)
          ├── fecha_fin (DATE)
          ├── producto (TEXT)
          ├── motivo (TEXT)
          ├── dosis (TEXT)
          └── notas (TEXT)
```

#### Arquitectura de Componentes

```
App.jsx
└── BrowserRouter
    └── AppProvider (Context)
        └── Layout.jsx (sidebar + outlet)
            ├── Dashboard.jsx
            │   ├── StatsCard.jsx (x4)
            │   └── BarChart (Recharts)
            ├── Colmenas.jsx
            │   ├── ColmenaCard.jsx (x N)
            │   └── Modal > ColmenaForm.jsx (con GoogleMap)
            ├── ColmenaDetail.jsx
            │   ├── [tab] HarvestForm.jsx
            │   ├── [tab] InspectionForm.jsx
            │   └── [tab] TreatmentForm.jsx
            ├── Mapa.jsx (GoogleMap + Marker + InfoWindow)
            ├── Recolecciones.jsx > Modal > HarvestForm.jsx
            ├── Inspecciones.jsx > Modal > InspectionForm.jsx
            └── Tratamientos.jsx > Modal > TreatmentForm.jsx
```

#### Diagrama de Secuencia: Crear una colmena

```
Usuario          ColmenaForm      Colmenas.jsx     API (client.js)     Backend           Supabase
   │                  │                │                 │                 │                 │
   │ Rellena form     │                │                 │                 │                 │
   │─────────────────>│                │                 │                 │                 │
   │ Clic en mapa     │                │                 │                 │                 │
   │ (fija lat/lng)   │                │                 │                 │                 │
   │─────────────────>│                │                 │                 │                 │
   │ Submit           │                │                 │                 │                 │
   │─────────────────>│                │                 │                 │                 │
   │                  │ onSubmit(data) │                 │                 │                 │
   │                  │───────────────>│                 │                 │                 │
   │                  │                │ colmenasApi     │                 │                 │
   │                  │                │ .create(data)   │                 │                 │
   │                  │                │────────────────>│                 │                 │
   │                  │                │                 │ POST /colmenas  │                 │
   │                  │                │                 │────────────────>│                 │
   │                  │                │                 │                 │ INSERT colmenas │
   │                  │                │                 │                 │────────────────>│
   │                  │                │                 │                 │<────────────────│
   │                  │                │                 │<────────────────│                 │
   │                  │                │<────────────────│                 │                 │
   │                  │                │ refreshColmenas │                 │                 │
   │                  │                │ (re-fetch)      │                 │                 │
   │ Modal se cierra  │<───────────────│                 │                 │                 │
   │<─────────────────│                │                 │                 │                 │
```

#### Diagrama de Despliegue

```
┌─────────────────────────────────────────────────────────────┐
│                    Cliente (Navegador)                       │
│  React + Vite :5173  ──────> Google Maps JS API (CDN)       │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP REST (Axios)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js + Express)                 │
│                        :3000                                 │
│   /api/colmenas  /api/recolecciones                         │
│   /api/inspecciones  /api/tratamientos                      │
└────────────────────────┬────────────────────────────────────┘
                         │ supabase-js (HTTPS)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Supabase (PostgreSQL managed)                  │
│   colmenas | recolecciones | inspecciones | tratamientos    │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Implementación

#### Estructura de directorios

```
marce.dam/
├── backend/
│   ├── package.json          # type: module, dependencias
│   ├── .env.example
│   ├── schema.sql            # DDL para Supabase
│   └── src/
│       ├── index.js          # Punto de entrada Express
│       ├── supabase.js       # Cliente Supabase
│       └── routes/
│           ├── colmenas.js
│           ├── recolecciones.js
│           ├── inspecciones.js
│           └── tratamientos.js
├── frontend/
│   ├── package.json
│   ├── .env.example
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx           # BrowserRouter + rutas
│       ├── main.jsx
│       ├── index.css         # Tailwind + componentes CSS
│       ├── api/client.js     # Axios + funciones por entidad
│       ├── context/AppContext.jsx
│       ├── utils/helpers.js
│       ├── components/
│       │   ├── Layout.jsx
│       │   ├── Modal.jsx
│       │   ├── StatsCard.jsx
│       │   ├── ColmenaCard.jsx
│       │   ├── ColmenaForm.jsx
│       │   ├── HarvestForm.jsx
│       │   ├── InspectionForm.jsx
│       │   └── TreatmentForm.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Colmenas.jsx
│           ├── ColmenaDetail.jsx
│           ├── Mapa.jsx
│           ├── Recolecciones.jsx
│           ├── Inspecciones.jsx
│           └── Tratamientos.jsx
└── memoria/
    └── MEMORIA.md
```

#### Fragmentos clave

**Backend — Ruta de colmenas con validación:**
```javascript
// backend/src/routes/colmenas.js
router.post('/', async (req, res) => {
  const { nombre, apiario, lat, lng, fecha_instalacion, estado, raza, notas } = req.body
  if (!nombre || !apiario) {
    return res.status(400).json({ error: 'nombre y apiario son obligatorios' })
  }
  const { data, error } = await supabase
    .from('colmenas')
    .insert([{ nombre, apiario, lat, lng, fecha_instalacion, estado, raza, notas }])
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})
```

**Frontend — Context con carga paralela:**
```javascript
// frontend/src/context/AppContext.jsx
const fetchAll = useCallback(async () => {
  setLoading(true)
  const [c, r, i, t] = await Promise.all([
    colmenasApi.getAll(),
    recoleccionesApi.getAll(),
    inspeccionesApi.getAll(),
    tratamientosApi.getAll(),
  ])
  setColmenas(c.data)
  setRecolecciones(r.data)
  setInspecciones(i.data)
  setTratamientos(t.data)
  setLoading(false)
}, [])
```

**Frontend — Selección de posición en mapa:**
```javascript
// frontend/src/components/ColmenaForm.jsx
const handleMapClick = useCallback((e) => {
  const lat = e.latLng.lat()
  const lng = e.latLng.lng()
  setForm(f => ({ ...f, lat: lat.toFixed(6), lng: lng.toFixed(6) }))
  setMapCenter({ lat, lng })
}, [])
```

**Frontend — Marcadores con color dinámico:**
```javascript
// frontend/src/pages/Mapa.jsx
function markerIcon(estado) {
  const color = ESTADOS_COLMENA[estado]?.markerColor ?? '#f59e0b'
  const svg = `<svg ...><path ... fill="${color}"/></svg>`
  return { url: `data:image/svg+xml;...`, scaledSize: { width: 32, height: 40 } }
}
```

**Schema SQL clave:**
```sql
CREATE TABLE colmenas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apiario TEXT NOT NULL,
  lat FLOAT, lng FLOAT,
  estado TEXT DEFAULT 'activa'
    CHECK (estado IN ('activa', 'revision', 'inactiva')),
  ...
);

CREATE TABLE recolecciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colmena_id UUID NOT NULL REFERENCES colmenas(id) ON DELETE CASCADE,
  ...
);
```

### 3.4 Manual de Usuario

#### Instalación y puesta en marcha

**Paso 1 — Configurar Supabase**
1. Crear cuenta en https://supabase.com y nuevo proyecto.
2. Ir a *SQL Editor* y ejecutar el contenido de `backend/schema.sql`.
3. Copiar la URL del proyecto y la `anon key` desde *Settings → API*.

**Paso 2 — Configurar el Backend**
```bash
cd backend
cp .env.example .env
# Editar .env con los valores de Supabase
npm install
npm start
# → Apiarium backend corriendo en http://localhost:3000
```

**Paso 3 — Configurar el Frontend**
```bash
cd frontend
cp .env.example .env
# Editar .env:
#   VITE_API_URL=http://localhost:3000/api
#   VITE_GOOGLE_MAPS_API_KEY=tu-clave
npm install
npm run dev
# → http://localhost:5173
```

#### Uso de la aplicación

**Dashboard**
- Al acceder a `/`, se muestran las estadísticas globales y el gráfico de producción mensual.

**Gestión de Colmenas**
1. Ir a *Colmenas* en el menú lateral.
2. Pulsar *Nueva colmena*.
3. Rellenar nombre y apiario (obligatorios).
4. Optionalmente, hacer clic en el mini mapa para fijar la posición.
5. Guardar.

**Registrar una recolección**
- Desde la lista de colmenas → *Ver detalle* → pestaña *Recolecciones* → *Nueva recolección*.
- O desde el menú *Recolecciones* (vista global).

**Mapa**
- En *Mapa*, se visualizan todas las colmenas con posición registrada.
- Verde = activa, Amarillo = en revisión, Rojo = inactiva.
- Hacer clic en un marcador muestra nombre, apiario, estado y enlace al detalle.

---

## 4. Propuestas de Mejora

| Prioridad | Mejora |
|-----------|--------|
| Alta | **Autenticación de usuarios**: añadir registro/login con Supabase Auth y Row Level Security para que cada apicultor vea solo sus datos. |
| Alta | **Alertas automáticas**: notificaciones cuando el conteo de varroa supere un umbral o cuando un tratamiento esté próximo a vencer. |
| Media | **Exportación a PDF/Excel**: generar informes de producción para la DOP o el veterinario. |
| Media | **Fotografías**: adjuntar imágenes a las inspecciones (almacenamiento en Supabase Storage). |
| Media | **App móvil nativa**: conversión a PWA (Progressive Web App) para uso offline en campo. |
| Baja | **Predicción de cosecha**: modelo de regresión simple basado en histórico de producción y datos meteorológicos (API OpenWeatherMap). |
| Baja | **Multi-apiario**: gestión multi-usuario con compartición de apiarios entre usuarios. |

---

## 5. Valoración Personal

El desarrollo de Apiarium ha supuesto un recorrido completo por las tecnologías del stack moderno de desarrollo web: desde el diseño del modelo relacional en PostgreSQL, pasando por la creación de una API REST con Express, hasta la construcción de una interfaz reactiva con React.

Los principales **aprendizajes técnicos** obtenidos son:
- Configuración y uso de **Supabase** como backend-as-a-service.
- Manejo de **variables de entorno** para separar configuración del código.
- Integración de **Google Maps JavaScript API** en React mediante `@react-google-maps/api`.
- Uso del **patrón Context** de React para estado global compartido entre componentes.
- **Tailwind CSS** para diseño responsive sin salir del JSX.
- Importancia del diseño previo (casos de uso, E/R) para evitar refactorizaciones costosas.

El mayor **desafío técnico** fue la integración del mapa tanto en la visualización global como en el formulario de creación/edición (mini mapa interactivo para selección de coordenadas). La solución pasó por gestionar correctamente el ciclo de vida del componente y el estado del marcador.

En términos **personales**, el proyecto ha reforzado la importancia de la organización del trabajo y el versionado del código. También ha mostrado el valor de las herramientas PaaS modernas, que reducen dramáticamente el tiempo de puesta en marcha de la infraestructura.

---

## 6. Fuentes Consultadas

### Documentación oficial
- React Documentation — https://react.dev
- Vite Documentation — https://vitejs.dev
- React Router v6 — https://reactrouter.com
- Tailwind CSS v3 — https://tailwindcss.com/docs
- Recharts — https://recharts.org
- @react-google-maps/api — https://react-google-maps-api-docs.netlify.app
- Express.js — https://expressjs.com
- Supabase Documentation — https://supabase.com/docs
- Google Maps JavaScript API — https://developers.google.com/maps/documentation/javascript

### Artículos y recursos
- MDN Web Docs (JavaScript, CSS, HTML) — https://developer.mozilla.org
- Lucide Icons — https://lucide.dev

### Normativa
- Real Decreto 1049/2003, de 1 de agosto, por el que se aprueba la Norma de calidad relativa a la miel. BOE núm. 186, de 5 de agosto de 2003.
- Directiva 2001/110/CE del Consejo relativa a la miel.
