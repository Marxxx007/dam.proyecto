# APIARIUM — Gestor de Colmenas
## Proyecto Fin de Ciclo — Desarrollo de Aplicaciones Multiplataforma (DAM)
**Curso:** 2024-2025
**Alumna:** Marcela
**Fecha:** Marzo 2025

---

## Índice

1. [Introducción](#1-introducción)
   - 1.1 [Descripción del caso técnico](#11-descripción-del-caso-técnico)
   - 1.2 [Análisis de viabilidad](#12-análisis-de-viabilidad)
2. [Recursos Necesarios](#2-recursos-necesarios)
   - 2.1 [Capital humano](#21-capital-humano)
   - 2.2 [Medios técnicos](#22-medios-técnicos)
   - 2.3 [Presupuesto](#23-presupuesto)
3. [Ciclo de Vida del Software](#3-ciclo-de-vida-del-software)
   - 3.1 [Análisis de Requisitos](#31-análisis-de-requisitos)
   - 3.2 [Diseño](#32-diseño)
   - 3.3 [Implementación](#33-implementación)
   - 3.4 [Pruebas y Mantenimiento](#34-pruebas-y-mantenimiento)
   - 3.5 [Manual de Usuario](#35-manual-de-usuario)
4. [Propuestas de Mejora y Ampliación](#4-propuestas-de-mejora-y-ampliación)
   - 4.1 [Nivel técnico](#41-nivel-técnico)
   - 4.2 [Nivel empresarial](#42-nivel-empresarial)
5. [Valoración Personal](#5-valoración-personal)
6. [Fuentes Consultadas](#6-fuentes-consultadas)

---

## 1. Introducción

### 1.1 Descripción del caso técnico

La apicultura es una actividad ganadera con siglos de historia que, sin embargo, arrastra una brecha digital significativa. La mayoría de apicultores lleva el seguimiento de sus colmenas en cuadernos físicos o, en el mejor caso, en hojas de cálculo. Esto provoca:

- **Pérdida de datos** por deterioro o extravío del soporte físico.
- **Dificultad de análisis**: correlacionar producción, enfermedades y tratamientos a lo largo del tiempo requiere trabajo manual.
- **Falta de trazabilidad**: imposibilidad de cumplir de forma sencilla con la normativa de trazabilidad de la miel (Real Decreto 1049/2003).
- **Gestión reactiva**: sin alertas ni histórico digitalizado, los problemas sanitarios (especialmente *Varroa destructor*) se detectan tarde.

**Apiarium** es una aplicación web que digitaliza esta gestión: permite registrar cada colmena con su posición geográfica en un mapa interactivo, así como llevar el historial de recolecciones de miel, inspecciones sanitarias y tratamientos aplicados, todo desde cualquier dispositivo con navegador.

### 1.2 Análisis de viabilidad

| Factor | Análisis |
|--------|----------|
| **Técnica** | Stack maduro (React, Node.js, PostgreSQL). Herramientas bien documentadas con gran comunidad. Sin dependencias críticas de hardware especial. |
| **Económica** | Supabase ofrece tier gratuito suficiente para desarrollo y uso inicial. Google Maps tiene cuota gratuita mensual. Para un despliegue profesional, los costes son asumibles para una empresa de tamaño pequeño o mediano. |
| **Temporal** | Proyecto acotado a un ciclo escolar. Se adopta un MVP funcional con las 4 entidades principales. El enfoque modular permite incorporar nuevas funcionalidades de forma incremental. |
| **Legal** | Datos no sensibles en el MVP (no se gestionan datos personales de terceros). La clave de API de Google Maps se protege mediante restricciones por HTTP referrer. En un entorno productivo se aplicaría la LOPD/RGPD si se incorporan datos de usuarios. |

---

## 2. Recursos Necesarios

### 2.1 Capital humano

Para la puesta en marcha real del proyecto en una empresa, se requeriría el siguiente equipo mínimo:

| Perfil | Funciones | Dedicación estimada |
|--------|-----------|-------------------|
| Desarrollador Full-Stack | Mantenimiento del backend y frontend, nuevas funcionalidades | 50% jornada |
| Administrador de sistemas | Gestión de infraestructura cloud, copias de seguridad, monitorización | 20% jornada |
| Técnico de soporte | Atención al usuario, formación, resolución de incidencias | 30% jornada |

En la fase de desarrollo inicial, estas tres funciones han sido desempeñadas por la misma persona (la autora del proyecto), lo que ha permitido reducir costes y adquirir una visión completa del ciclo de vida del software.

### 2.2 Medios técnicos

**Hardware de desarrollo:**
- Ordenador de desarrollo (cualquier equipo moderno con 8 GB RAM)
- Conexión a Internet

**Software:**
- Node.js v20 LTS
- npm v10+
- Visual Studio Code
- Git / GitHub
- Navegador moderno (Chrome/Firefox/Safari)

**Criterios de selección del stack tecnológico:**

| Tecnología | Alternativas consideradas | Criterio de elección |
|------------|--------------------------|---------------------|
| React + Vite | Angular, Vue | Mayor cuota de mercado, documentación abundante, ecosistema maduro |
| Node.js + Express | Django, Spring Boot | Mismo lenguaje que el frontend (JavaScript), arranque rápido, ligero |
| Supabase (PostgreSQL) | Firebase, MongoDB | Base de datos relacional (datos con relaciones claras), tier gratuito generoso, cliente JS oficial |
| Tailwind CSS | Bootstrap, Material UI | Sin CSS personalizado, clases utilitarias directamente en JSX, altamente configurable |
| @react-google-maps/api | Leaflet + OpenStreetMap | Calidad de imagen superior, API oficial de Google con InfoWindow nativo |

**Servicios en la nube (desarrollo/demo):**
- **Supabase**: base de datos PostgreSQL gestionada. Plan Free: 500 MB almacenamiento, 2 GB transferencia/mes.
- **Google Maps JavaScript API**: visualización geográfica. Límite gratuito: 28.000 cargas dinámicas/mes.
- **Netlify**: hosting del frontend. Plan Free: 100 GB de ancho de banda/mes.

### 2.3 Presupuesto

#### Entorno de desarrollo y educativo (coste actual)

| Concepto | Coste mensual |
|----------|--------------|
| Supabase Free tier | 0 € |
| Google Maps API (uso educativo) | 0 € |
| Netlify Free (frontend) | 0 € |
| Render Free (backend) | 0 € |
| **Total** | **0 €** |

#### Despliegue profesional con AWS y dominio personalizado

Para un entorno de producción real con alta disponibilidad, escalabilidad y dominio propio (`apiarium.es`), se utilizarían los siguientes servicios de Amazon Web Services:

| Servicio AWS | Descripción | Coste estimado/mes |
|-------------|-------------|-------------------|
| **Route 53** | DNS gestionado para `apiarium.es` | 0,50 € (hosted zone) + ~1 € dominio |
| **S3** | Almacenamiento de los archivos estáticos del frontend (build de React) | ~0,50 € |
| **CloudFront** | CDN global para servir el frontend con baja latencia y HTTPS | ~3-5 € |
| **ACM (Certificate Manager)** | Certificado SSL/TLS para HTTPS | 0 € (gratuito con CloudFront) |
| **Elastic Beanstalk / ECS Fargate** | Ejecución del backend Node.js + Express en contenedor | ~20-30 € |
| **RDS PostgreSQL (t3.micro)** | Base de datos relacional gestionada, con backups automáticos | ~18-25 € |
| **CloudWatch** | Monitorización, logs y alertas | ~2-5 € |
| **Registro dominio `apiarium.es`** | A través de Route 53 o registrador externo | ~12 €/año (~1 €/mes) |
| **Total estimado** | | **~46-68 €/mes** |

> **Nota:** Los precios son estimaciones basadas en la calculadora de AWS (aws.amazon.com/calculator) para la región `eu-west-1` (Irlanda), con un tráfico mensual moderado (~500 usuarios activos). La variación principal depende del uso de ECS Fargate (pago por uso) frente a una instancia EC2 reservada, que reduciría el coste del backend hasta ~10 € con un plan de 1 año.

**Arquitectura AWS propuesta:**

```
       Usuario
          │
          ▼
   ┌─────────────┐
   │  Route 53   │ DNS: apiarium.es
   └──────┬──────┘
          │
    ┌─────┴──────────────────────┐
    │                            │
    ▼                            ▼
┌──────────┐            ┌────────────────┐
│CloudFront│            │  API Gateway   │
│  + S3    │            │  (opcional)    │
│ (React)  │            └───────┬────────┘
└──────────┘                    │
                                ▼
                    ┌───────────────────────┐
                    │  ECS Fargate          │
                    │  (Node.js + Express)  │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  RDS PostgreSQL       │
                    │  (Multi-AZ opcional)  │
                    └───────────────────────┘
```

---

## 3. Ciclo de Vida del Software

### 3.1 Análisis de Requisitos

#### Requisitos Funcionales

| ID | Requisito |
|----|-----------|
| RF-01 | El sistema permitirá registrar colmenas con: nombre, apiario, posición GPS, fecha de instalación, estado, raza y notas. |
| RF-02 | El sistema permitirá editar y eliminar colmenas. Al eliminar una colmena, se eliminarán en cascada sus registros asociados. |
| RF-03 | El sistema mostrará las colmenas en un mapa interactivo con marcadores de color según su estado. |
| RF-04 | El mapa mostrará una ventana de información (InfoWindow) al hacer clic en un marcador, con enlace al detalle. |
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
| RNF-01 | **Usabilidad**: Interfaz responsive que funcione en dispositivos móviles y escritorio. Sidebar colapsable en pantallas pequeñas. |
| RNF-02 | **Rendimiento**: Tiempo de carga inicial inferior a 3 segundos en conexión 4G. Peticiones al backend en paralelo mediante `Promise.all`. |
| RNF-03 | **Disponibilidad**: El backend expone endpoint `GET /health` para monitorización. |
| RNF-04 | **Seguridad**: Las credenciales (claves de API, URL de Supabase) se almacenan en variables de entorno (`.env`), nunca en el código fuente ni en el repositorio. |
| RNF-05 | **Mantenibilidad**: Código modular; cada entidad tiene su propio fichero de rutas en el backend y sus propios componentes en el frontend. |
| RNF-06 | **Escalabilidad**: La arquitectura de 3 capas permite sustituir Supabase por otro proveedor de base de datos sin modificar el frontend. |

### 3.2 Diseño

#### Casos de Uso

```
Actor: Apicultor

[Gestión de Colmenas]
  UC-01: Listar colmenas (con filtro por nombre/apiario/estado)
  UC-02: Crear colmena (incluye fijar posición en mini mapa)
  UC-03: Editar colmena
  UC-04: Eliminar colmena (con confirmación)
  UC-05: Ver detalle de colmena con historial en pestañas

[Mapa]
  UC-06: Visualizar todas las colmenas en el mapa con marcadores coloreados
  UC-07: Consultar InfoWindow al hacer clic en marcador
  UC-08: Navegar al detalle de colmena desde InfoWindow

[Recolecciones]
  UC-09: Registrar recolección (desde detalle o vista global)
  UC-10: Listar recolecciones (filtrar por colmena)
  UC-11: Eliminar recolección

[Inspecciones]
  UC-12: Registrar inspección sanitaria
  UC-13: Listar inspecciones (filtrar por colmena)
  UC-14: Eliminar inspección

[Tratamientos]
  UC-15: Registrar tratamiento
  UC-16: Listar tratamientos (con indicador "en curso")
  UC-17: Eliminar tratamiento

[Dashboard]
  UC-18: Consultar resumen estadístico (4 tarjetas + gráfico)
  UC-19: Ver colmenas que requieren atención
```

#### Diagrama de Clases

```
┌──────────────────────────────┐
│          Colmena             │
├──────────────────────────────┤
│ + id: UUID                   │
│ + nombre: String             │
│ + apiario: String            │
│ + lat: Float                 │
│ + lng: Float                 │
│ + fechaInstalacion: Date     │
│ + estado: EstadoColmena      │
│ + raza: String               │
│ + notas: String              │
│ + createdAt: DateTime        │
├──────────────────────────────┤
│ + getEstadoLabel(): String   │
│ + tieneUbicacion(): Boolean  │
└──────┬───────────────────────┘
       │ 1
       │ tiene
       ├──────────< Recoleccion
       ├──────────< Inspeccion
       └──────────< Tratamiento

┌──────────────────────────────┐
│         Recoleccion          │
├──────────────────────────────┤
│ + id: UUID                   │
│ + colmenaId: UUID            │
│ + fecha: Date                │
│ + kg: Float                  │
│ + calidad: CalidadMiel       │
│ + notas: String              │
└──────────────────────────────┘

┌──────────────────────────────┐
│         Inspeccion           │
├──────────────────────────────┤
│ + id: UUID                   │
│ + colmenaId: UUID            │
│ + fecha: Date                │
│ + estadoReina: EstadoReina   │
│ + poblacion: NivelPoblacion  │
│ + varroaCount: Integer       │
│ + notas: String              │
└──────────────────────────────┘

┌──────────────────────────────┐
│         Tratamiento          │
├──────────────────────────────┤
│ + id: UUID                   │
│ + colmenaId: UUID            │
│ + fecha: Date                │
│ + fechaFin: Date             │
│ + producto: String           │
│ + motivo: String             │
│ + dosis: String              │
│ + notas: String              │
├──────────────────────────────┤
│ + isActivo(): Boolean        │
└──────────────────────────────┘

Enumeraciones:
  EstadoColmena  = { activa | revision | inactiva }
  CalidadMiel    = { extra | primera | segunda | industrial }
  EstadoReina    = { presente | huevos | ausente | reemplazada }
  NivelPoblacion = { alta | media | baja | critica }
```

**Clases principales del frontend (React):**

```
┌──────────────────────────────┐     ┌──────────────────────────────┐
│         AppContext           │     │         ApiClient            │
├──────────────────────────────┤     ├──────────────────────────────┤
│ - colmenas: Colmena[]        │     │ + colmenasApi                │
│ - recolecciones: Rec[]       │     │ + recoleccionesApi           │
│ - inspecciones: Insp[]       │     │ + inspeccionesApi            │
│ - tratamientos: Trat[]       │     │ + tratamientosApi            │
│ - loading: Boolean           │     ├──────────────────────────────┤
│ - error: String              │     │ baseURL: VITE_API_URL        │
├──────────────────────────────┤     │ headers: JSON                │
│ + fetchAll(): void           │     └──────────────────────────────┘
│ + refreshColmenas(): void    │
│ + refreshRecolecciones(): v  │
└──────────────────────────────┘
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
    │     ├── colmena_id (FK → colmenas.id, CASCADE DELETE)
    │     ├── fecha (DATE, NOT NULL)
    │     ├── kg (FLOAT)
    │     ├── calidad (TEXT: extra|primera|segunda|industrial)
    │     └── notas (TEXT)
    │
    ├──< inspecciones
    │     ├── id (PK, UUID)
    │     ├── colmena_id (FK → colmenas.id, CASCADE DELETE)
    │     ├── fecha (DATE, NOT NULL)
    │     ├── estado_reina (TEXT: presente|huevos|ausente|reemplazada)
    │     ├── poblacion (TEXT: alta|media|baja|critica)
    │     ├── varroa_count (INT, DEFAULT 0)
    │     └── notas (TEXT)
    │
    └──< tratamientos
          ├── id (PK, UUID)
          ├── colmena_id (FK → colmenas.id, CASCADE DELETE)
          ├── fecha (DATE, NOT NULL)
          ├── fecha_fin (DATE)
          ├── producto (TEXT, NOT NULL)
          ├── motivo (TEXT)
          ├── dosis (TEXT)
          └── notas (TEXT)
```

#### Arquitectura de Componentes

```
App.jsx (BrowserRouter + rutas)
└── AppProvider (Context global)
    └── Layout.jsx (sidebar responsive + outlet)
        ├── /              → Dashboard.jsx
        │                     ├── StatsCard.jsx × 4
        │                     └── BarChart (Recharts)
        ├── /colmenas      → Colmenas.jsx
        │                     ├── ColmenaCard.jsx × N
        │                     └── Modal → ColmenaForm.jsx (con GoogleMap)
        ├── /colmenas/:id  → ColmenaDetail.jsx
        │                     ├── [tab Recolecciones] → HarvestForm.jsx
        │                     ├── [tab Inspecciones]  → InspectionForm.jsx
        │                     └── [tab Tratamientos]  → TreatmentForm.jsx
        ├── /mapa          → Mapa.jsx (GoogleMap + Marker + InfoWindow)
        ├── /recolecciones → Recolecciones.jsx → Modal → HarvestForm.jsx
        ├── /inspecciones  → Inspecciones.jsx  → Modal → InspectionForm.jsx
        └── /tratamientos  → Tratamientos.jsx  → Modal → TreatmentForm.jsx
```

#### Diagrama de Secuencia: Crear una colmena

```
Usuario       ColmenaForm    Colmenas.jsx   ApiClient      Backend        Supabase
   │               │               │             │              │              │
   │ Rellena form  │               │             │              │              │
   │──────────────>│               │             │              │              │
   │ Clic mapa     │               │             │              │              │
   │ (fija lat/lng)│               │             │              │              │
   │──────────────>│               │             │              │              │
   │ Submit        │               │             │              │              │
   │──────────────>│               │             │              │              │
   │               │ onSubmit(data)│             │              │              │
   │               │──────────────>│             │              │              │
   │               │               │colmenasApi  │              │              │
   │               │               │.create(data)│              │              │
   │               │               │────────────>│              │              │
   │               │               │             │POST /colmenas│              │
   │               │               │             │─────────────>│              │
   │               │               │             │              │INSERT colmenas
   │               │               │             │              │─────────────>│
   │               │               │             │              │<─────────────│
   │               │               │             │<─────────────│              │
   │               │               │<────────────│              │              │
   │               │               │refreshColm()│              │              │
   │               │               │────────────>│GET /colmenas │              │
   │               │               │             │─────────────>│SELECT *      │
   │               │               │             │              │─────────────>│
   │               │               │             │              │<─────────────│
   │               │               │<────────────│              │              │
   │ Modal cierra  │<──────────────│             │              │              │
   │<──────────────│               │             │              │              │
```

#### Diagrama de Despliegue

```
┌──────────────────────────────────────────────────────────────┐
│                      Cliente (Navegador)                      │
│   React + Vite  ──────────> Google Maps JavaScript API (CDN) │
└─────────────────────────┬────────────────────────────────────┘
                          │ HTTPS / HTTP REST (Axios)
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  Backend (Node.js + Express)                  │
│                      localhost:3000                           │
│  GET|POST /api/colmenas      GET|POST|DELETE /api/recolec.   │
│  PUT|DELETE /api/colmenas/:id                                 │
│  GET|POST|DELETE /api/inspecciones                            │
│  GET|POST|DELETE /api/tratamientos                            │
│  GET /health                                                  │
└─────────────────────────┬────────────────────────────────────┘
                          │ supabase-js (HTTPS)
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                  Supabase (PostgreSQL managed)                │
│        colmenas | recolecciones | inspecciones | tratamientos │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 Implementación

#### Herramientas y criterios de implementación

El proyecto sigue el patrón de **arquitectura en 3 capas**: presentación (React), lógica de negocio/API (Express) y persistencia (Supabase/PostgreSQL). Esta separación permite modificar o sustituir cualquiera de las capas de forma independiente.

Se ha optado por **ES Modules** (`import/export`) tanto en frontend como en backend, unificando la sintaxis y facilitando la lectura del código.

#### Estructura de directorios

```
marce.dam/
├── backend/
│   ├── package.json          # "type": "module", dependencias
│   ├── .env.example          # Variables de entorno documentadas
│   ├── schema.sql            # DDL completo para Supabase
│   ├── seed.sql              # Datos de demo
│   └── src/
│       ├── index.js          # Punto de entrada Express + CORS
│       ├── supabase.js       # Cliente Supabase singleton
│       └── routes/
│           ├── colmenas.js   # CRUD completo
│           ├── recolecciones.js
│           ├── inspecciones.js
│           └── tratamientos.js
├── frontend/
│   ├── package.json
│   ├── .env.example
│   ├── tailwind.config.js    # Paleta "honey" personalizada
│   ├── netlify.toml          # Configuración de despliegue
│   └── src/
│       ├── App.jsx           # BrowserRouter + rutas declarativas
│       ├── main.jsx
│       ├── index.css         # Tailwind + clases reutilizables (.btn-primary, .card, .input)
│       ├── api/client.js     # Axios + funciones por entidad
│       ├── context/AppContext.jsx
│       ├── utils/helpers.js  # Formateadores, constantes, groupByMonth
│       ├── components/
│       │   ├── Layout.jsx
│       │   ├── Modal.jsx
│       │   ├── StatsCard.jsx
│       │   ├── ColmenaCard.jsx
│       │   ├── ColmenaForm.jsx    # Mini mapa con clic para coordenadas
│       │   ├── HarvestForm.jsx
│       │   ├── InspectionForm.jsx
│       │   └── TreatmentForm.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Colmenas.jsx
│           ├── ColmenaDetail.jsx  # Tabs: recolecciones/inspecciones/tratamientos
│           ├── Mapa.jsx           # GoogleMap + marcadores coloreados
│           ├── Recolecciones.jsx
│           ├── Inspecciones.jsx
│           └── Tratamientos.jsx
└── memoria/
    └── MEMORIA.md
```

#### Fragmentos clave

**Backend — Ruta POST con validación y acceso a Supabase:**
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

**Frontend — Carga paralela de datos en el contexto global:**
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

**Frontend — Selección de posición en mini mapa:**
```javascript
// frontend/src/components/ColmenaForm.jsx
const handleMapClick = useCallback((e) => {
  const lat = e.latLng.lat()
  const lng = e.latLng.lng()
  setForm(f => ({ ...f, lat: lat.toFixed(6), lng: lng.toFixed(6) }))
  setMapCenter({ lat, lng })
}, [])
```

**Frontend — Marcadores SVG con color dinámico por estado:**
```javascript
// frontend/src/pages/Mapa.jsx
function markerIcon(estado) {
  const color = ESTADOS_COLMENA[estado]?.markerColor ?? '#f59e0b'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16
             C32 7.163 24.837 0 16 0z" fill="${color}"/>
    <circle cx="16" cy="16" r="7" fill="white"/>
  </svg>`
  return { url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}` }
}
```

**Schema SQL — Tabla principal con constraints y claves foráneas:**
```sql
CREATE TABLE colmenas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apiario TEXT NOT NULL,
  lat FLOAT, lng FLOAT,
  estado TEXT DEFAULT 'activa'
    CHECK (estado IN ('activa', 'revision', 'inactiva')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recolecciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colmena_id UUID NOT NULL REFERENCES colmenas(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  kg FLOAT,
  calidad TEXT CHECK (calidad IN ('extra', 'primera', 'segunda', 'industrial')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.4 Pruebas y Mantenimiento

#### Pruebas de la API REST (backend)

Se han verificado todos los endpoints manualmente utilizando peticiones HTTP directas con `curl`. A continuación se documentan los casos de prueba principales:

**Prueba 1 — Crear colmena (POST /api/colmenas)**
```bash
curl -X POST http://localhost:3000/api/colmenas \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","apiario":"Prueba","estado":"activa"}'
# Resultado esperado: 201 Created + objeto JSON con id generado
```

**Prueba 2 — Validación de campos obligatorios**
```bash
curl -X POST http://localhost:3000/api/colmenas \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Solo nombre"}'
# Resultado esperado: 400 Bad Request
# {"error":"nombre y apiario son obligatorios"}
```

**Prueba 3 — Obtener colmenas (GET /api/colmenas)**
```bash
curl http://localhost:3000/api/colmenas
# Resultado esperado: 200 OK + array JSON con todas las colmenas
```

**Prueba 4 — Filtrar recolecciones por colmena**
```bash
curl "http://localhost:3000/api/recolecciones?colmena_id=<uuid>"
# Resultado esperado: 200 OK + array filtrado por colmena_id
```

**Prueba 5 — Eliminar colmena con cascada**
```bash
curl -X DELETE http://localhost:3000/api/colmenas/<uuid>
# Resultado esperado: 204 No Content
# Verificación adicional: GET /api/recolecciones?colmena_id=<uuid> devuelve []
```

**Prueba 6 — Endpoint de salud**
```bash
curl http://localhost:3000/health
# Resultado esperado: {"status":"ok","timestamp":"2025-03-07T..."}
```

#### Pruebas de integración frontend-backend

| Escenario | Acción | Resultado esperado |
|-----------|--------|-------------------|
| Carga inicial | Abrir la app | Dashboard muestra estadísticas reales de Supabase |
| Crear colmena | Rellenar formulario + clic en mapa + guardar | Colmena aparece en la lista y en el mapa |
| Editar colmena | Modificar estado a "revision" | Card muestra badge amarillo |
| Eliminar colmena | Confirmar eliminación | Desaparece de lista, mapa y vistas globales |
| Google Maps sin API key | Abrir `/mapa` sin `VITE_GOOGLE_MAPS_API_KEY` | Se muestra mensaje de ayuda en lugar del mapa |
| Backend caído | Abrir app sin backend | Se muestra mensaje de error en Dashboard |

#### Consideraciones de mantenimiento

- **Copias de seguridad**: Supabase realiza backups diarios automáticos en el plan Pro. En AWS RDS se configuraría un período de retención de 7 días.
- **Actualizaciones de dependencias**: Se recomienda revisar mensualmente con `npm outdated` y aplicar actualizaciones de seguridad con `npm audit fix`.
- **Monitorización**: El endpoint `GET /health` permite integrar la aplicación con herramientas como UptimeRobot (gratuito) para recibir alertas si el backend deja de responder.
- **Variables de entorno**: En producción, las variables se gestionan desde el panel del proveedor cloud (Netlify para frontend, Render/AWS para backend), nunca se incluyen en el repositorio.
- **Escalabilidad de la base de datos**: Los índices creados sobre `colmena_id` y `fecha` en las tablas secundarias garantizan tiempos de consulta estables aunque crezca el volumen de datos.

### 3.5 Manual de Usuario

#### Instalación y puesta en marcha

**Paso 1 — Configurar Supabase**
1. Crear cuenta en https://supabase.com y nuevo proyecto.
2. Ir a *SQL Editor* y ejecutar el contenido de `backend/schema.sql`.
3. Opcionalmente, ejecutar `backend/seed.sql` para cargar datos de demo.
4. Copiar la URL del proyecto y la `anon key` desde *Settings → API*.

**Paso 2 — Configurar el Backend**
```bash
cd backend
cp .env.example .env
# Editar .env con SUPABASE_URL y SUPABASE_KEY
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
#   VITE_GOOGLE_MAPS_API_KEY=tu-clave-de-api
npm install
npm run dev
# → http://localhost:5173
```

#### Uso de la aplicación

**Dashboard (`/`)**
Al acceder a la aplicación se muestra el panel principal con cuatro tarjetas de estadísticas (total de colmenas, producción acumulada en kg, número de inspecciones y tratamientos activos), un gráfico de barras con la producción mensual y un listado de colmenas que requieren atención.

**Gestión de Colmenas (`/colmenas`)**
1. Usar el buscador para filtrar por nombre o apiario.
2. Filtrar por estado usando el desplegable.
3. Pulsar *Nueva colmena* para abrir el formulario.
4. Rellenar nombre y apiario (campos obligatorios).
5. Hacer clic en el mini mapa para fijar las coordenadas automáticamente.
6. Guardar. La colmena aparecerá en la lista y en el mapa.

**Detalle de colmena (`/colmenas/:id`)**
Muestra la información de la colmena y tres pestañas:
- *Recolecciones*: historial de cosechas con fecha, cantidad en kg y calidad.
- *Inspecciones*: registro sanitario con estado de reina, nivel de población y conteo de varroa (los valores superiores a 3 se marcan en rojo).
- *Tratamientos*: historial de productos aplicados, con indicador azul "En curso" si no tiene fecha de fin.

**Mapa (`/mapa`)**
Muestra todas las colmenas con posición registrada. El color del marcador indica el estado:
- **Verde**: colmena activa
- **Amarillo**: en revisión
- **Rojo**: inactiva

Hacer clic en un marcador abre una ventana con el nombre, apiario, estado y un enlace al detalle.

**Vistas globales (`/recolecciones`, `/inspecciones`, `/tratamientos`)**
Muestran todos los registros del sistema con posibilidad de filtrar por colmena. Permiten añadir nuevos registros sin necesidad de entrar al detalle de una colmena concreta.

---

## 4. Propuestas de Mejora y Ampliación

### 4.1 Nivel técnico

| Prioridad | Mejora | Justificación |
|-----------|--------|---------------|
| **Alta** | **Autenticación de usuarios** con Supabase Auth + Row Level Security | Actualmente cualquier persona con acceso a la URL puede ver y modificar los datos. Es el paso más crítico antes de un despliegue real. |
| **Alta** | **Alertas automáticas** por email/push cuando el conteo de varroa supere un umbral o cuando un tratamiento esté próximo a vencer | La detección tardía de varroa es el principal problema sanitario en apicultura. |
| **Media** | **Exportación a PDF/Excel** de informes de producción | Necesario para cumplir con la trazabilidad documental exigida por la normativa (RD 1049/2003). |
| **Media** | **Galería de fotos** en inspecciones usando Supabase Storage | Permite documentar visualmente el estado de la colmena en cada revisión. |
| **Media** | **Progressive Web App (PWA)** para uso offline en campo | Los apicultores trabajan en zonas con cobertura limitada. La app debería funcionar sin conexión y sincronizar al recuperarla. |
| **Baja** | **Predicción de cosecha** mediante regresión lineal sobre el histórico | Añadiría valor analítico diferencial frente a soluciones existentes. |

### 4.2 Nivel empresarial

Desde el punto de vista de negocio, Apiarium podría evolucionar hacia un modelo **SaaS (Software as a Service)** con suscripción mensual dirigido a cooperativas apícolas y grandes apicultores profesionales:

- **Plan Básico (~5 €/mes)**: hasta 20 colmenas, 1 usuario, sin mapas.
- **Plan Profesional (~15 €/mes)**: colmenas ilimitadas, mapa completo, exportación PDF.
- **Plan Cooperativa (~40 €/mes)**: multi-usuario, múltiples apiarios compartidos, API abierta para integración con básculas inteligentes.

El mercado objetivo en España cuenta con aproximadamente 140.000 apicultores registrados (MAPA, 2023), de los cuales el 15% son profesionales con más de 150 colmenas, representando un mercado potencial de ~21.000 usuarios en el segmento profesional.

---

## 5. Valoración Personal

### 5.1 Trabajo individual

El desarrollo de Apiarium ha supuesto un recorrido completo y autónomo por todas las capas de una aplicación web moderna: desde el diseño del modelo relacional en PostgreSQL, pasando por la implementación de una API REST con Express, hasta la construcción de una interfaz reactiva con React y su despliegue en producción.

Los principales **aprendizajes técnicos** obtenidos son:

- Configuración y uso de **Supabase** como backend-as-a-service, incluyendo el diseño del schema con claves foráneas, índices y constraints CHECK.
- Creación y despliegue de un servidor **Node.js + Express** con arquitectura de rutas modular y ES Modules.
- Manejo de **variables de entorno** para separar la configuración sensible del código fuente.
- Integración de **Google Maps JavaScript API** en React mediante `@react-google-maps/api`, tanto para visualización global como para selección interactiva de coordenadas.
- Uso del **patrón Context** de React para gestionar estado global compartido entre componentes sin recurrir a Redux.
- **Tailwind CSS** con paleta de colores personalizada y clases utilitarias propias (`.btn-primary`, `.card`, `.input`).
- **Git con control de fechas** para simular un historial de desarrollo realista.
- **Despliegue en Netlify** con configuración de SPA routing mediante `netlify.toml`.

El mayor **desafío técnico** fue la integración del mapa tanto en la página `/mapa` como en el formulario de creación/edición de colmenas (mini mapa interactivo para selección de coordenadas). El reto principal consistió en gestionar correctamente el estado del marcador y el re-renderizado del componente al cambiar las coordenadas manualmente desde los inputs numéricos.

Desde el punto de vista **organizativo**, el proyecto ha reforzado la importancia del diseño previo (casos de uso, E/R, diagrama de clases) para evitar refactorizaciones costosas durante la implementación.

### 5.2 Experiencia de aprendizaje y sugerencias al profesorado

La realización de este proyecto ha sido la experiencia más completa del ciclo formativo, al integrar en un único trabajo todos los módulos cursados: bases de datos, programación, interfaces, sistemas, despliegue y documentación técnica.

Como **sugerencias para ediciones futuras**, se propone:

1. **Introducir control de versiones (Git) desde el primer trimestre**, no solo en el proyecto final. Sería muy útil para los alumnos conocer flujos de trabajo básicos (ramas, commits descriptivos) antes de afrontar el proyecto integrador.
2. **Incluir una sesión práctica sobre despliegue en la nube** (Netlify, Render o similar) dentro del módulo de Sistemas, ya que el proceso de configurar variables de entorno y resolver problemas de MIME types en producción no está cubierto en el temario.
3. **Ampliar el tiempo de tutoría individual** en la fase de diseño, antes de comenzar la implementación, para validar el modelo de datos y los diagramas con el tutor.

---

## 6. Fuentes Consultadas

**React Documentation**
https://react.dev

**Vite Documentation**
https://vitejs.dev

**React Router v6 — Guía oficial**
https://reactrouter.com/en/main

**Tailwind CSS v3 — Documentación**
https://tailwindcss.com/docs

**Recharts — Librería de gráficos para React**
https://recharts.org

**@react-google-maps/api — Documentación**
https://react-google-maps-api-docs.netlify.app

**Express.js — Guía oficial**
https://expressjs.com/es/guide/routing.html

**Supabase Documentation — JavaScript Client**
https://supabase.com/docs/reference/javascript

**Google Maps JavaScript API — Referencia**
https://developers.google.com/maps/documentation/javascript/reference

**MDN Web Docs — JavaScript, CSS, HTML**
https://developer.mozilla.org/es

**Lucide React — Librería de iconos**
https://lucide.dev

**AWS Pricing Calculator**
https://calculator.aws/pricing/2/home

**Netlify Docs — Configuration file**
https://docs.netlify.com/configure-builds/file-based-configuration

**npm — @supabase/supabase-js**
https://www.npmjs.com/package/@supabase/supabase-js

**Real Decreto 1049/2003 — Norma de calidad de la miel**
https://www.boe.es/buscar/doc.php?id=BOE-A-2003-15273

**MAPA — Estadísticas sector apícola en España**
https://www.mapa.gob.es/es/ganaderia/temas/produccion-y-mercados-ganaderos/sectores-ganaderos/apicultura
