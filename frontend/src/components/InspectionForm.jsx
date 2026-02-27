import { useState } from 'react'
import { ESTADO_REINA, POBLACION } from '../utils/helpers'

export default function InspectionForm({ colmenas = [], initialColmenaId = '', onSubmit, onCancel }) {
  const [form, setForm] = useState({
    colmena_id: initialColmenaId,
    fecha: new Date().toISOString().slice(0, 10),
    estado_reina: '',
    poblacion: '',
    varroa_count: '',
    notas: '',
  })
  const [saving, setSaving] = useState(false)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit({
        ...form,
        varroa_count: form.varroa_count !== '' ? parseInt(form.varroa_count, 10) : null,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {colmenas.length > 0 && (
        <div>
          <label className="label">Colmena *</label>
          <select className="input" value={form.colmena_id} onChange={set('colmena_id')} required>
            <option value="">— Selecciona una colmena —</option>
            {colmenas.map(c => (
              <option key={c.id} value={c.id}>{c.nombre} ({c.apiario})</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="label">Fecha *</label>
        <input className="input" type="date" value={form.fecha} onChange={set('fecha')} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Estado de la reina</label>
          <select className="input" value={form.estado_reina} onChange={set('estado_reina')}>
            <option value="">— Sin especificar —</option>
            {ESTADO_REINA.map(e => (
              <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Población</label>
          <select className="input" value={form.poblacion} onChange={set('poblacion')}>
            <option value="">— Sin especificar —</option>
            {POBLACION.map(p => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Conteo varroa</label>
        <input
          className="input"
          type="number"
          min="0"
          value={form.varroa_count}
          onChange={set('varroa_count')}
          placeholder="Número de ácaros"
        />
      </div>

      <div>
        <label className="label">Notas</label>
        <textarea className="input resize-none" rows={3} value={form.notas} onChange={set('notas')} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary flex-1">
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}
