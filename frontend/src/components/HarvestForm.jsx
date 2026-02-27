import { useState } from 'react'
import { CALIDAD_MIEL } from '../utils/helpers'

export default function HarvestForm({ colmenas = [], initialColmenaId = '', onSubmit, onCancel }) {
  const [form, setForm] = useState({
    colmena_id: initialColmenaId,
    fecha: new Date().toISOString().slice(0, 10),
    kg: '',
    calidad: '',
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
        kg: form.kg !== '' ? parseFloat(form.kg) : null,
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Fecha *</label>
          <input className="input" type="date" value={form.fecha} onChange={set('fecha')} required />
        </div>
        <div>
          <label className="label">Cantidad (kg)</label>
          <input
            className="input"
            type="number"
            step="0.1"
            min="0"
            value={form.kg}
            onChange={set('kg')}
            placeholder="0.0"
          />
        </div>
      </div>

      <div>
        <label className="label">Calidad</label>
        <select className="input" value={form.calidad} onChange={set('calidad')}>
          <option value="">— Sin especificar —</option>
          {CALIDAD_MIEL.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
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
