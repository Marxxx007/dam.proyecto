export const ESTADOS_COLMENA = {
  activa: { label: 'Activa', color: 'green', bgClass: 'bg-green-100 text-green-700', markerColor: '#22c55e' },
  revision: { label: 'En revisión', color: 'yellow', bgClass: 'bg-yellow-100 text-yellow-700', markerColor: '#eab308' },
  inactiva: { label: 'Inactiva', color: 'red', bgClass: 'bg-red-100 text-red-700', markerColor: '#ef4444' },
}

export const CALIDAD_MIEL = ['extra', 'primera', 'segunda', 'industrial']
export const ESTADO_REINA = ['presente', 'huevos', 'ausente', 'reemplazada']
export const POBLACION = ['alta', 'media', 'baja', 'critica']

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const formatKg = (kg) => {
  if (kg == null) return '—'
  return `${Number(kg).toFixed(1)} kg`
}

export const groupByMonth = (recolecciones) => {
  const months = {}
  recolecciones.forEach(({ fecha, kg }) => {
    if (!fecha) return
    const key = fecha.slice(0, 7) // YYYY-MM
    months[key] = (months[key] || 0) + (kg || 0)
  })
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, kg]) => ({ mes, kg: Math.round(kg * 10) / 10 }))
}
