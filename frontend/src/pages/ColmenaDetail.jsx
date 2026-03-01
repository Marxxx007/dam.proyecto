import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { colmenasApi, recoleccionesApi, inspeccionesApi, tratamientosApi } from '../api/client'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import HarvestForm from '../components/HarvestForm'
import InspectionForm from '../components/InspectionForm'
import TreatmentForm from '../components/TreatmentForm'
import { ESTADOS_COLMENA, formatDate, formatKg } from '../utils/helpers'
import { ArrowLeft, Plus, Trash2, Package, Search, Syringe, MapPin, Calendar, AlertCircle } from 'lucide-react'

const TABS = [
  { id: 'recolecciones', label: 'Recolecciones', icon: Package },
  { id: 'inspecciones', label: 'Inspecciones', icon: Search },
  { id: 'tratamientos', label: 'Tratamientos', icon: Syringe },
]

export default function ColmenaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { refreshColmenas } = useApp()

  const [colmena, setColmena] = useState(null)
  const [recolecciones, setRecolecciones] = useState([])
  const [inspecciones, setInspecciones] = useState([])
  const [tratamientos, setTratamientos] = useState([])
  const [activeTab, setActiveTab] = useState('recolecciones')
  const [showModal, setShowModal] = useState(null) // 'recoleccion' | 'inspeccion' | 'tratamiento'
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const [c, r, i, t] = await Promise.all([
        colmenasApi.getById(id),
        recoleccionesApi.getAll(id),
        inspeccionesApi.getAll(id),
        tratamientosApi.getAll(id),
      ])
      setColmena(c.data)
      setRecolecciones(r.data)
      setInspecciones(i.data)
      setTratamientos(t.data)
    } catch {
      // not found
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [id])

  const handleAddRecoleccion = async (data) => {
    await recoleccionesApi.create({ ...data, colmena_id: id })
    await loadData()
    setShowModal(null)
  }

  const handleAddInspeccion = async (data) => {
    await inspeccionesApi.create({ ...data, colmena_id: id })
    await loadData()
    setShowModal(null)
  }

  const handleAddTratamiento = async (data) => {
    await tratamientosApi.create({ ...data, colmena_id: id })
    await loadData()
    setShowModal(null)
  }

  const handleDeleteRecoleccion = async (rid) => {
    if (!confirm('¿Eliminar esta recolección?')) return
    await recoleccionesApi.remove(rid)
    setRecolecciones(r => r.filter(x => x.id !== rid))
  }

  const handleDeleteInspeccion = async (iid) => {
    if (!confirm('¿Eliminar esta inspección?')) return
    await inspeccionesApi.remove(iid)
    setInspecciones(i => i.filter(x => x.id !== iid))
  }

  const handleDeleteTratamiento = async (tid) => {
    if (!confirm('¿Eliminar este tratamiento?')) return
    await tratamientosApi.remove(tid)
    setTratamientos(t => t.filter(x => x.id !== tid))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-honey-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!colmena) {
    return (
      <div className="card p-8 text-center">
        <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
        <p className="text-gray-600">Colmena no encontrada</p>
        <Link to="/colmenas" className="mt-3 inline-block text-honey-600 hover:underline text-sm">← Volver</Link>
      </div>
    )
  }

  const estado = ESTADOS_COLMENA[colmena.estado] ?? ESTADOS_COLMENA.activa
  const totalKg = recolecciones.reduce((s, r) => s + (r.kg || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link to="/colmenas" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-3">
          <ArrowLeft size={14} /> Colmenas
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{colmena.nombre}</h2>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${estado.bgClass}`}>
                {estado.label}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={13} /> {colmena.apiario}</span>
              {colmena.raza && <span>🐝 {colmena.raza}</span>}
              {colmena.fecha_instalacion && (
                <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(colmena.fecha_instalacion)}</span>
              )}
            </div>
            {colmena.notas && <p className="mt-2 text-sm text-gray-500 max-w-lg">{colmena.notas}</p>}
          </div>

          {/* Quick stats */}
          <div className="flex gap-4 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-honey-600">{formatKg(totalKg)}</p>
              <p className="text-xs text-gray-500">producción</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{inspecciones.length}</p>
              <p className="text-xs text-gray-500">inspecciones</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{tratamientos.length}</p>
              <p className="text-xs text-gray-500">tratamientos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-100">
          {TABS.map(({ id: tabId, label, icon: Icon }) => (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tabId
                  ? 'border-b-2 border-honey-500 text-honey-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Recolecciones tab */}
          {activeTab === 'recolecciones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{recolecciones.length} registros · {formatKg(totalKg)} total</p>
                <button onClick={() => setShowModal('recoleccion')} className="btn-primary flex items-center gap-1.5 text-sm py-1.5">
                  <Plus size={14} /> Nueva recolección
                </button>
              </div>
              {recolecciones.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No hay recolecciones registradas</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-2 font-medium">Fecha</th>
                        <th className="pb-2 font-medium">Cantidad</th>
                        <th className="pb-2 font-medium">Calidad</th>
                        <th className="pb-2 font-medium">Notas</th>
                        <th className="pb-2" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {recolecciones.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="py-3">{formatDate(r.fecha)}</td>
                          <td className="py-3 font-medium text-honey-700">{formatKg(r.kg)}</td>
                          <td className="py-3 capitalize">{r.calidad ?? '—'}</td>
                          <td className="py-3 text-gray-500 max-w-[200px] truncate">{r.notas ?? '—'}</td>
                          <td className="py-3 text-right">
                            <button onClick={() => handleDeleteRecoleccion(r.id)} className="text-red-400 hover:text-red-600 p-1">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Inspecciones tab */}
          {activeTab === 'inspecciones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{inspecciones.length} inspecciones</p>
                <button onClick={() => setShowModal('inspeccion')} className="btn-primary flex items-center gap-1.5 text-sm py-1.5">
                  <Plus size={14} /> Nueva inspección
                </button>
              </div>
              {inspecciones.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No hay inspecciones registradas</p>
              ) : (
                <div className="space-y-3">
                  {inspecciones.map(ins => (
                    <div key={ins.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Fecha</p>
                          <p className="font-medium">{formatDate(ins.fecha)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Reina</p>
                          <p className="capitalize">{ins.estado_reina ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Población</p>
                          <p className="capitalize">{ins.poblacion ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Varroa</p>
                          <p className={ins.varroa_count > 3 ? 'text-red-600 font-medium' : ''}>
                            {ins.varroa_count ?? 0}
                          </p>
                        </div>
                        {ins.notas && (
                          <div className="col-span-2 sm:col-span-4">
                            <p className="text-xs text-gray-500">{ins.notas}</p>
                          </div>
                        )}
                      </div>
                      <button onClick={() => handleDeleteInspeccion(ins.id)} className="text-red-400 hover:text-red-600 p-1 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tratamientos tab */}
          {activeTab === 'tratamientos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{tratamientos.length} tratamientos</p>
                <button onClick={() => setShowModal('tratamiento')} className="btn-primary flex items-center gap-1.5 text-sm py-1.5">
                  <Plus size={14} /> Nuevo tratamiento
                </button>
              </div>
              {tratamientos.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No hay tratamientos registrados</p>
              ) : (
                <div className="space-y-3">
                  {tratamientos.map(t => (
                    <div key={t.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Producto</p>
                          <p className="font-medium">{t.producto}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Inicio</p>
                          <p>{formatDate(t.fecha)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Fin</p>
                          <p>{t.fecha_fin ? formatDate(t.fecha_fin) : <span className="text-blue-500 text-xs">En curso</span>}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Dosis</p>
                          <p>{t.dosis ?? '—'}</p>
                        </div>
                        {(t.motivo || t.notas) && (
                          <div className="col-span-2 sm:col-span-4 text-xs text-gray-500">
                            {t.motivo && <span>Motivo: {t.motivo}</span>}
                            {t.motivo && t.notas && <span> · </span>}
                            {t.notas && <span>{t.notas}</span>}
                          </div>
                        )}
                      </div>
                      <button onClick={() => handleDeleteTratamiento(t.id)} className="text-red-400 hover:text-red-600 p-1 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal === 'recoleccion' && (
        <Modal title="Nueva recolección" onClose={() => setShowModal(null)}>
          <HarvestForm initialColmenaId={id} onSubmit={handleAddRecoleccion} onCancel={() => setShowModal(null)} />
        </Modal>
      )}
      {showModal === 'inspeccion' && (
        <Modal title="Nueva inspección" onClose={() => setShowModal(null)}>
          <InspectionForm initialColmenaId={id} onSubmit={handleAddInspeccion} onCancel={() => setShowModal(null)} />
        </Modal>
      )}
      {showModal === 'tratamiento' && (
        <Modal title="Nuevo tratamiento" onClose={() => setShowModal(null)}>
          <TreatmentForm initialColmenaId={id} onSubmit={handleAddTratamiento} onCancel={() => setShowModal(null)} />
        </Modal>
      )}
    </div>
  )
}
