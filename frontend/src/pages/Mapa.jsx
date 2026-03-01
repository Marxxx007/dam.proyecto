import { useState } from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { ESTADOS_COLMENA } from '../utils/helpers'
import { AlertCircle } from 'lucide-react'

const DEFAULT_CENTER = { lat: 40.416775, lng: -3.703790 }

function markerIcon(estado) {
  const color = ESTADOS_COLMENA[estado]?.markerColor ?? '#f59e0b'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="${color}"/>
    <circle cx="16" cy="16" r="7" fill="white"/>
  </svg>`
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: { width: 32, height: 40 },
  }
}

export default function Mapa() {
  const { colmenas, loading } = useApp()
  const [selected, setSelected] = useState(null)
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey ?? '',
  })

  const colmenasConPos = colmenas.filter(c => c.lat != null && c.lng != null)

  // Compute center from colmenas, else default
  const center = colmenasConPos.length > 0
    ? {
        lat: colmenasConPos.reduce((s, c) => s + Number(c.lat), 0) / colmenasConPos.length,
        lng: colmenasConPos.reduce((s, c) => s + Number(c.lng), 0) / colmenasConPos.length,
      }
    : DEFAULT_CENTER

  if (!googleMapsApiKey) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Mapa de colmenas</h2>
        <div className="card p-8 flex items-center gap-3 text-amber-700 bg-amber-50 border-amber-200">
          <AlertCircle size={20} />
          <div>
            <p className="font-medium">API Key de Google Maps no configurada</p>
            <p className="text-sm mt-1">Añade <code className="bg-amber-100 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> al fichero <code className="bg-amber-100 px-1 rounded">.env</code> del frontend y reinicia el servidor.</p>
          </div>
        </div>
        {/* Show list of colmenas with coordinates */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Colmenas con posición ({colmenasConPos.length})</h3>
          {colmenasConPos.length === 0 ? (
            <p className="text-gray-400 text-sm">Ninguna colmena tiene coordenadas registradas</p>
          ) : (
            <ul className="space-y-2">
              {colmenasConPos.map(c => (
                <li key={c.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: ESTADOS_COLMENA[c.estado]?.markerColor }} />
                  <span className="font-medium text-sm">{c.nombre}</span>
                  <span className="text-xs text-gray-500">{c.apiario}</span>
                  <span className="ml-auto text-xs text-gray-400 font-mono">{Number(c.lat).toFixed(4)}, {Number(c.lng).toFixed(4)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mapa de colmenas</h2>
          <p className="text-gray-500 text-sm mt-1">{colmenasConPos.length} colmenas con posición registrada</p>
        </div>
        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600">
          {Object.entries(ESTADOS_COLMENA).map(([key, val]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: val.markerColor }} />
              {val.label}
            </span>
          ))}
        </div>
      </div>

      {!isLoaded ? (
        <div className="card flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-honey-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Cargando mapa...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: 'calc(100vh - 220px)', minHeight: '500px' }}
            center={center}
            zoom={colmenasConPos.length > 0 ? 10 : 6}
            options={{
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          >
            {colmenasConPos.map(c => (
              <Marker
                key={c.id}
                position={{ lat: Number(c.lat), lng: Number(c.lng) }}
                icon={markerIcon(c.estado)}
                title={c.nombre}
                onClick={() => setSelected(c)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{ lat: Number(selected.lat), lng: Number(selected.lng) }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="p-1 min-w-[160px]">
                  <p className="font-semibold text-gray-900 text-sm">{selected.nombre}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.apiario}</p>
                  <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${ESTADOS_COLMENA[selected.estado]?.bgClass}`}>
                    {ESTADOS_COLMENA[selected.estado]?.label}
                  </span>
                  <div className="mt-2">
                    <Link
                      to={`/colmenas/${selected.id}`}
                      className="text-xs text-honey-600 font-medium hover:underline"
                      onClick={() => setSelected(null)}
                    >
                      Ver detalle →
                    </Link>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}

      {colmenasConPos.length === 0 && (
        <div className="card p-6 text-center">
          <p className="text-gray-500 text-sm">Ninguna colmena tiene coordenadas. Edita una colmena y fija su posición en el mapa.</p>
          <Link to="/colmenas" className="mt-3 inline-block text-honey-600 font-medium text-sm hover:underline">
            Ir a colmenas →
          </Link>
        </div>
      )}
    </div>
  )
}
