import { useApp } from '../context/AppContext'
import StatsCard from '../components/StatsCard'
import { groupByMonth, formatDate } from '../utils/helpers'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Bug, Package, Search, Syringe, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { colmenas, recolecciones, inspecciones, tratamientos, loading, error } = useApp()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-honey-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Cargando datos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <AlertCircle size={20} />
        <span>{error}</span>
      </div>
    )
  }

  const totalKg = recolecciones.reduce((sum, r) => sum + (r.kg || 0), 0)
  const colmenasActivas = colmenas.filter(c => c.estado === 'activa').length
  const tratamientosActivos = tratamientos.filter(t => !t.fecha_fin || new Date(t.fecha_fin) >= new Date()).length
  const chartData = groupByMonth(recolecciones)

  const ultimasInspecciones = [...inspecciones]
    .sort((a, b) => b.fecha?.localeCompare(a.fecha))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Resumen general de tu apiario</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total colmenas"
          value={colmenas.length}
          subtitle={`${colmenasActivas} activas`}
          icon={Bug}
          color="honey"
        />
        <StatsCard
          title="Producción total"
          value={`${totalKg.toFixed(1)} kg`}
          subtitle={`${recolecciones.length} recolecciones`}
          icon={Package}
          color="green"
        />
        <StatsCard
          title="Inspecciones"
          value={inspecciones.length}
          subtitle="registradas"
          icon={Search}
          color="blue"
        />
        <StatsCard
          title="Tratamientos activos"
          value={tratamientosActivos}
          subtitle={`${tratamientos.length} totales`}
          icon={Syringe}
          color={tratamientosActivos > 0 ? 'red' : 'honey'}
        />
      </div>

      {/* Chart + latest inspections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Production chart */}
        <div className="card p-6 xl:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4">Producción por mes (kg)</h3>
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              Sin datos de recolección aún
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} unit=" kg" />
                <Tooltip formatter={(v) => [`${v} kg`, 'Producción']} />
                <Bar dataKey="kg" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Latest inspections */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Últimas inspecciones</h3>
            <Link to="/inspecciones" className="text-xs text-honey-600 hover:underline">Ver todas</Link>
          </div>
          {ultimasInspecciones.length === 0 ? (
            <p className="text-gray-400 text-sm">Sin inspecciones registradas</p>
          ) : (
            <ul className="space-y-3">
              {ultimasInspecciones.map(ins => (
                <li key={ins.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-honey-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {ins.colmenas?.nombre ?? 'Colmena'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(ins.fecha)} · Reina: {ins.estado_reina ?? '—'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Colmenas en revisión */}
      {colmenas.filter(c => c.estado !== 'activa').length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Colmenas que requieren atención</h3>
          <div className="space-y-2">
            {colmenas.filter(c => c.estado !== 'activa').map(c => (
              <Link
                key={c.id}
                to={`/colmenas/${c.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-honey-50 transition-colors"
              >
                <Bug size={16} className={c.estado === 'revision' ? 'text-yellow-500' : 'text-red-500'} />
                <span className="text-sm font-medium text-gray-800">{c.nombre}</span>
                <span className="ml-auto text-xs text-gray-500 capitalize">{c.estado}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
