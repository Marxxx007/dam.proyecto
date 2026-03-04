import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import TreatmentForm from '../components/TreatmentForm'
import { tratamientosApi } from '../api/client'
import { formatDate } from '../utils/helpers'
import { Plus, Trash2, Syringe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Tratamientos() {
  const { colmenas, tratamientos, refreshTratamientos } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [filterColmena, setFilterColmena] = useState('')

  const filtered = filterColmena
    ? tratamientos.filter(t => t.colmena_id === filterColmena)
    : tratamientos

  const activos = filtered.filter(t => !t.fecha_fin || new Date(t.fecha_fin) >= new Date()).length

  const handleCreate = async (data) => {
    await tratamientosApi.create(data)
    await refreshTratamientos()
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este tratamiento?')) return
    await tratamientosApi.remove(id)
    await refreshTratamientos()
  }

  const isActivo = (t) => !t.fecha_fin || new Date(t.fecha_fin) >= new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tratamientos</h2>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} registros · {activos} activos</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Nuevo tratamiento
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
            <Syringe size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">Sin tratamientos registrados</p>
            <button onClick={() => setShowForm(true)} className="mt-3 btn-primary text-sm inline-flex items-center gap-1.5">
              <Plus size={14} /> Añadir tratamiento
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Colmena</th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Inicio</th>
                <th className="px-4 py-3 font-medium">Fin</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Motivo</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Dosis</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link to={`/colmenas/${t.colmena_id}`} className="font-medium text-honey-700 hover:underline">
                      {t.colmenas?.nombre ?? '—'}
                    </Link>
                    <p className="text-xs text-gray-400">{t.colmenas?.apiario}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{t.producto}</td>
                  <td className="px-4 py-3">{formatDate(t.fecha)}</td>
                  <td className="px-4 py-3">
                    {isActivo(t) ? (
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">En curso</span>
                    ) : formatDate(t.fecha_fin)}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{t.motivo ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{t.dosis ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-600 p-1">
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
        <Modal title="Nuevo tratamiento" onClose={() => setShowForm(false)}>
          <TreatmentForm colmenas={colmenas} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  )
}
