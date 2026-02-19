import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

// GET /api/colmenas
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('colmenas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// GET /api/colmenas/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('colmenas')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ error: error.message })
  res.json(data)
})

// POST /api/colmenas
router.post('/', async (req, res) => {
  const { nombre, apiario, lat, lng, fecha_instalacion, estado, raza, notas } = req.body

  if (!nombre || !apiario) {
    return res.status(400).json({ error: 'nombre y apiario son obligatorios' })
  }

  const { data, error } = await supabase
    .from('colmenas')
    .insert([{ nombre, apiario, lat, lng, fecha_instalacion, estado, raza, notas }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// PUT /api/colmenas/:id
router.put('/:id', async (req, res) => {
  const { nombre, apiario, lat, lng, fecha_instalacion, estado, raza, notas } = req.body

  const { data, error } = await supabase
    .from('colmenas')
    .update({ nombre, apiario, lat, lng, fecha_instalacion, estado, raza, notas })
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// DELETE /api/colmenas/:id
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('colmenas')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
})

export default router
