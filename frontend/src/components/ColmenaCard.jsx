import { Link } from 'react-router-dom'
import { MapPin, Calendar, ChevronRight } from 'lucide-react'
import { ESTADOS_COLMENA, formatDate } from '../utils/helpers'

export default function ColmenaCard({ colmena, onEdit, onDelete }) {
  const estado = ESTADOS_COLMENA[colmena.estado] ?? ESTADOS_COLMENA.activa

  return (
    <div className="card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{colmena.nombre}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin size={13} />
            {colmena.apiario}
          </p>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${estado.bgClass}`}>
          {estado.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        {colmena.raza && <span>🐝 {colmena.raza}</span>}
        {colmena.fecha_instalacion && (
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(colmena.fecha_instalacion)}
          </span>
        )}
        {colmena.lat && colmena.lng && (
          <span className="text-gray-400">{Number(colmena.lat).toFixed(4)}, {Number(colmena.lng).toFixed(4)}</span>
        )}
      </div>

      {colmena.notas && (
        <p className="text-xs text-gray-500 line-clamp-2">{colmena.notas}</p>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <Link
          to={`/colmenas/${colmena.id}`}
          className="flex-1 text-center text-sm text-honey-600 hover:text-honey-700 font-medium flex items-center justify-center gap-1"
        >
          Ver detalle <ChevronRight size={14} />
        </Link>
        <button
          onClick={() => onEdit(colmena)}
          className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(colmena)}
          className="text-sm text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
