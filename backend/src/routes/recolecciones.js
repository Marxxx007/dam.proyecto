import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

// GET /api/recolecciones?colmena_id=xxx
router.get('/', async (req, res) => {
  let query = supabase
    .from('recolecciones')
    .select('*, colmenas(nombre, apiario)')
    .order('fecha', { ascending: false })

  if (req.query.colmena_id) {
    query = query.eq('colmena_id', req.query.colmena_id)
  }

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST /api/recolecciones
router.post('/', async (req, res) => {
  const { colmena_id, fecha, kg, calidad, notas } = req.body

  if (!colmena_id || !fecha) {
    return res.status(400).json({ error: 'colmena_id y fecha son obligatorios' })
  }

  const { data, error } = await supabase
    .from('recolecciones')
    .insert([{ colmena_id, fecha, kg, calidad, notas }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// DELETE /api/recolecciones/:id
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('recolecciones')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
})

export default router
