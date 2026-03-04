import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import HarvestForm from '../components/HarvestForm'
import { recoleccionesApi } from '../api/client'
import { formatDate, formatKg } from '../utils/helpers'
import { Plus, Trash2, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Recolecciones() {
  const { colmenas, recolecciones, refreshRecolecciones } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [filterColmena, setFilterColmena] = useState('')

  const filtered = filterColmena
    ? recolecciones.filter(r => r.colmena_id === filterColmena)
    : recolecciones

  const totalKg = filtered.reduce((s, r) => s + (r.kg || 0), 0)

  const handleCreate = async (data) => {
    await recoleccionesApi.create(data)
    await refreshRecolecciones()
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta recolección?')) return
    await recoleccionesApi.remove(id)
    await refreshRecolecciones()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recolecciones</h2>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} registros · {formatKg(totalKg)} total</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Nueva recolección
        </button>
      </div>

      {/* Filter */}
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

      {/* Table */}
      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">Sin recolecciones registradas</p>
            <button onClick={() => setShowForm(true)} className="mt-3 btn-primary text-sm inline-flex items-center gap-1.5">
              <Plus size={14} /> Añadir recolección
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Colmena</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Cantidad</th>
                <th className="px-4 py-3 font-medium">Calidad</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Notas</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link to={`/colmenas/${r.colmena_id}`} className="font-medium text-honey-700 hover:underline">
                      {r.colmenas?.nombre ?? '—'}
                    </Link>
                    <p className="text-xs text-gray-400">{r.colmenas?.apiario}</p>
                  </td>
                  <td className="px-4 py-3">{formatDate(r.fecha)}</td>
                  <td className="px-4 py-3 font-semibold text-honey-700">{formatKg(r.kg)}</td>
                  <td className="px-4 py-3 capitalize">{r.calidad ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[200px] truncate">{r.notas ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600 p-1">
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
        <Modal title="Nueva recolección" onClose={() => setShowForm(false)}>
          <HarvestForm colmenas={colmenas} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  )
}
