-- Apiarium - Schema SQL para Supabase
-- Ejecutar en el SQL Editor de Supabase

-- Tabla de colmenas
CREATE TABLE IF NOT EXISTS colmenas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apiario TEXT NOT NULL,
  lat FLOAT,
  lng FLOAT,
  fecha_instalacion DATE,
  estado TEXT DEFAULT 'activa' CHECK (estado IN ('activa', 'revision', 'inactiva')),
  raza TEXT,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de recolecciones
CREATE TABLE IF NOT EXISTS recolecciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colmena_id UUID NOT NULL REFERENCES colmenas(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  kg FLOAT,
  calidad TEXT CHECK (calidad IN ('extra', 'primera', 'segunda', 'industrial')),
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de inspecciones
CREATE TABLE IF NOT EXISTS inspecciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colmena_id UUID NOT NULL REFERENCES colmenas(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  estado_reina TEXT CHECK (estado_reina IN ('presente', 'huevos', 'ausente', 'reemplazada')),
  poblacion TEXT CHECK (poblacion IN ('alta', 'media', 'baja', 'critica')),
  varroa_count INT DEFAULT 0,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de tratamientos
CREATE TABLE IF NOT EXISTS tratamientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colmena_id UUID NOT NULL REFERENCES colmenas(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  fecha_fin DATE,
  producto TEXT NOT NULL,
  motivo TEXT,
  dosis TEXT,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para mejorar rendimiento en consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_recolecciones_colmena ON recolecciones(colmena_id);
CREATE INDEX IF NOT EXISTS idx_inspecciones_colmena ON inspecciones(colmena_id);
CREATE INDEX IF NOT EXISTS idx_tratamientos_colmena ON tratamientos(colmena_id);
CREATE INDEX IF NOT EXISTS idx_recolecciones_fecha ON recolecciones(fecha);
CREATE INDEX IF NOT EXISTS idx_inspecciones_fecha ON inspecciones(fecha);
CREATE INDEX IF NOT EXISTS idx_tratamientos_fecha ON tratamientos(fecha);

-- Row Level Security (desactivado para desarrollo, activar en producción)
-- ALTER TABLE colmenas ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE recolecciones ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE inspecciones ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tratamientos ENABLE ROW LEVEL SECURITY;
