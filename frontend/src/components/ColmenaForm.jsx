import { useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const ESTADOS = ['activa', 'revision', 'inactiva']
const RAZAS = ['Apis mellifera iberiensis', 'Apis mellifera ligustica', 'Buckfast', 'Cárnica', 'Otra']

const DEFAULT_CENTER = { lat: 40.416775, lng: -3.703790 } // Madrid

export default function ColmenaForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    nombre: initial.nombre ?? '',
    apiario: initial.apiario ?? '',
    lat: initial.lat ?? '',
    lng: initial.lng ?? '',
    fecha_instalacion: initial.fecha_instalacion ?? '',
    estado: initial.estado ?? 'activa',
    raza: initial.raza ?? '',
    notas: initial.notas ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [mapCenter, setMapCenter] = useState(
    initial.lat && initial.lng
      ? { lat: Number(initial.lat), lng: Number(initial.lng) }
      : DEFAULT_CENTER
  )

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey ?? '',
  })

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setForm(f => ({ ...f, lat: lat.toFixed(6), lng: lng.toFixed(6) }))
    setMapCenter({ lat, lng })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit({
        ...form,
        lat: form.lat !== '' ? parseFloat(form.lat) : null,
        lng: form.lng !== '' ? parseFloat(form.lng) : null,
      })
    } finally {
      setSaving(false)
    }
  }

  const markerPos = form.lat !== '' && form.lng !== ''
    ? { lat: parseFloat(form.lat), lng: parseFloat(form.lng) }
    : null

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Nombre *</label>
          <input className="input" value={form.nombre} onChange={set('nombre')} required placeholder="Ej: Colmena 01" />
        </div>
        <div>
          <label className="label">Apiario *</label>
          <input className="input" value={form.apiario} onChange={set('apiario')} required placeholder="Ej: Monte Norte" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Estado</label>
          <select className="input" value={form.estado} onChange={set('estado')}>
            {ESTADOS.map(e => (
              <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Raza</label>
          <input className="input" list="razas-list" value={form.raza} onChange={set('raza')} placeholder="Raza de abeja" />
          <datalist id="razas-list">
            {RAZAS.map(r => <option key={r} value={r} />)}
          </datalist>
        </div>
      </div>

      <div>
        <label className="label">Fecha de instalación</label>
        <input className="input" type="date" value={form.fecha_instalacion} onChange={set('fecha_instalacion')} />
      </div>

      {/* Location */}
      <div>
        <label className="label">Ubicación (lat / lng)</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            className="input"
            type="number"
            step="any"
            placeholder="Latitud"
            value={form.lat}
            onChange={set('lat')}
          />
          <input
            className="input"
            type="number"
            step="any"
            placeholder="Longitud"
            value={form.lng}
            onChange={set('lng')}
          />
        </div>

        {googleMapsApiKey ? (
          isLoaded ? (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <p className="text-xs text-gray-500 px-3 py-1.5 bg-gray-50 border-b border-gray-100">
                Haz clic en el mapa para fijar la posición
              </p>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '220px' }}
                center={markerPos ?? mapCenter}
                zoom={markerPos ? 14 : 6}
                onClick={handleMapClick}
                options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
              >
                {markerPos && <Marker position={markerPos} />}
              </GoogleMap>
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg text-sm text-gray-400">
              Cargando mapa...
            </div>
          )
        ) : (
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
            Configura VITE_GOOGLE_MAPS_API_KEY en .env para ver el mini mapa
          </p>
        )}
      </div>

      <div>
        <label className="label">Notas</label>
        <textarea
          className="input resize-none"
          rows={3}
          value={form.notas}
          onChange={set('notas')}
          placeholder="Observaciones adicionales..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary flex-1">
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}
