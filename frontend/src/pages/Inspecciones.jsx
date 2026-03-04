import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import InspectionForm from '../components/InspectionForm'
import { inspeccionesApi } from '../api/client'
import { formatDate } from '../utils/helpers'
import { Plus, Trash2, Search as SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const POBLACION_BADGE = {
  alta: 'bg-green-100 text-green-700',
  media: 'bg-yellow-100 text-yellow-700',
  baja: 'bg-orange-100 text-orange-700',
  critica: 'bg-red-100 text-red-700',
}

export default function Inspecciones() {
  const { colmenas, inspecciones, refreshInspecciones } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [filterColmena, setFilterColmena] = useState('')

  const filtered = filterColmena
    ? inspecciones.filter(i => i.colmena_id === filterColmena)
    : inspecciones

  const handleCreate = async (data) => {
    await inspeccionesApi.create(data)
    await refreshInspecciones()
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta inspección?')) return
    await inspeccionesApi.remove(id)
    await refreshInspecciones()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inspecciones</h2>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} registros</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Nueva inspección
        </button>
      </div>

      <div className="flex gap-3">
        <select
          className="input sm:w-64"
          value={filterColmena}
          onChange={e => setFilterColmena(e.target.value)}
        >
          <option value="">Todas las colmenas</option>
          {colmenas.map(c => (
            <option key={c.id} value={c.id}>{c.nombre} ({c.apiario})</option>
          ))}
        </select>
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <SearchIcon size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">Sin inspecciones registradas</p>
            <button onClick={() => setShowForm(true)} className="mt-3 btn-primary text-sm inline-flex items-center gap-1.5">
              <Plus size={14} /> Añadir inspección
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Colmena</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Reina</th>
                <th className="px-4 py-3 font-medium">Población</th>
                <th className="px-4 py-3 font-medium">Varroa</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Notas</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(ins => (
                <tr key={ins.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link to={`/colmenas/${ins.colmena_id}`} className="font-medium text-honey-700 hover:underline">
                      {ins.colmenas?.nombre ?? '—'}
                    </Link>
                    <p className="text-xs text-gray-400">{ins.colmenas?.apiario}</p>
                  </td>
                  <td className="px-4 py-3">{formatDate(ins.fecha)}</td>
                  <td className="px-4 py-3 capitalize">{ins.estado_reina ?? '—'}</td>
                  <td className="px-4 py-3">
                    {ins.poblacion ? (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${POBLACION_BADGE[ins.poblacion] ?? ''}`}>
                        {ins.poblacion}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={ins.varroa_count > 3 ? 'text-red-600 font-semibold' : ''}>
                      {ins.varroa_count ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell max-w-[200px] truncate">{ins.notas ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(ins.id)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <Modal title="Nueva inspección" onClose={() => setShowForm(false)}>
          <InspectionForm colmenas={colmenas} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  )
}
