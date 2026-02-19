import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

// GET /api/inspecciones?colmena_id=xxx
router.get('/', async (req, res) => {
  let query = supabase
    .from('inspecciones')
    .select('*, colmenas(nombre, apiario)')
    .order('fecha', { ascending: false })

  if (req.query.colmena_id) {
    query = query.eq('colmena_id', req.query.colmena_id)
  }

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST /api/inspecciones
router.post('/', async (req, res) => {
  const { colmena_id, fecha, estado_reina, poblacion, varroa_count, notas } = req.body

  if (!colmena_id || !fecha) {
    return res.status(400).json({ error: 'colmena_id y fecha son obligatorios' })
  }

  const { data, error } = await supabase
    .from('inspecciones')
    .insert([{ colmena_id, fecha, estado_reina, poblacion, varroa_count, notas }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// DELETE /api/inspecciones/:id
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('inspecciones')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
})

export default router
