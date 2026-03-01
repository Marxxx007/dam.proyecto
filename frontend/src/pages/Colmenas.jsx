import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ColmenaCard from '../components/ColmenaCard'
import ColmenaForm from '../components/ColmenaForm'
import Modal from '../components/Modal'
import { colmenasApi } from '../api/client'
import { Plus, Search } from 'lucide-react'

export default function Colmenas() {
  const { colmenas, refreshColmenas } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [search, setSearch] = useState('')
  const [filterEstado, setFilterEstado] = useState('')

  const filtered = colmenas.filter(c => {
    const q = search.toLowerCase()
    const matchText = c.nombre.toLowerCase().includes(q) || c.apiario.toLowerCase().includes(q)
    const matchEstado = filterEstado ? c.estado === filterEstado : true
    return matchText && matchEstado
  })

  const handleCreate = async (data) => {
    await colmenasApi.create(data)
    await refreshColmenas()
    setShowForm(false)
  }

  const handleEdit = async (data) => {
    await colmenasApi.update(editTarget.id, data)
    await refreshColmenas()
    setEditTarget(null)
  }

  const handleDelete = async (colmena) => {
    if (!confirm(`¿Eliminar la colmena "${colmena.nombre}"? Esto borrará también sus registros asociados.`)) return
    await colmenasApi.remove(colmena.id)
    await refreshColmenas()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Colmenas</h2>
          <p className="text-gray-500 text-sm mt-1">{colmenas.length} colmenas registradas</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Nueva colmena
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Buscar por nombre o apiario..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input sm:w-44"
          value={filterEstado}
          onChange={e => setFilterEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="activa">Activa</option>
          <option value="revision">En revisión</option>
          <option value="inactiva">Inactiva</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400 mb-3">No hay colmenas que mostrar</p>
          <button onClick={() => setShowForm(true)} className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} />
            Añadir primera colmena
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => (
            <ColmenaCard
              key={c.id}
              colmena={c}
              onEdit={(c) => setEditTarget(c)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create modal */}
      {showForm && (
        <Modal title="Nueva colmena" onClose={() => setShowForm(false)}>
          <ColmenaForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </Modal>
      )}

      {/* Edit modal */}
      {editTarget && (
        <Modal title="Editar colmena" onClose={() => setEditTarget(null)}>
          <ColmenaForm initial={editTarget} onSubmit={handleEdit} onCancel={() => setEditTarget(null)} />
        </Modal>
      )}
    </div>
  )
}
