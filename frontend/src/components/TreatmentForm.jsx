import { useState } from 'react'

const PRODUCTOS_COMUNES = ['Apistan', 'ApiLife Var', 'Oxalic acid', 'MAQS', 'Thymovar', 'Apivar', 'Otro']

export default function TreatmentForm({ colmenas = [], initialColmenaId = '', onSubmit, onCancel }) {
  const [form, setForm] = useState({
    colmena_id: initialColmenaId,
    fecha: new Date().toISOString().slice(0, 10),
    fecha_fin: '',
    producto: '',
    motivo: '',
    dosis: '',
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
        fecha_fin: form.fecha_fin || null,
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
        <label className="label">Producto *</label>
        <input
          className="input"
          list="productos-list"
          value={form.producto}
          onChange={set('producto')}
          required
          placeholder="Nombre del producto"
        />
        <datalist id="productos-list">
          {PRODUCTOS_COMUNES.map(p => <option key={p} value={p} />)}
        </datalist>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Fecha inicio *</label>
          <input className="input" type="date" value={form.fecha} onChange={set('fecha')} required />
        </div>
        <div>
          <label className="label">Fecha fin</label>
          <input className="input" type="date" value={form.fecha_fin} onChange={set('fecha_fin')} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Motivo</label>
          <input className="input" value={form.motivo} onChange={set('motivo')} placeholder="Ej: Varroa" />
        </div>
        <div>
          <label className="label">Dosis</label>
          <input className="input" value={form.dosis} onChange={set('dosis')} placeholder="Ej: 1 tira" />
        </div>
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
