import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import colmenasRouter from './routes/colmenas.js'
import recoleccionesRouter from './routes/recolecciones.js'
import inspeccionesRouter from './routes/inspecciones.js'
import tratamientosRouter from './routes/tratamientos.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/colmenas', colmenasRouter)
app.use('/api/recolecciones', recoleccionesRouter)
app.use('/api/inspecciones', inspeccionesRouter)
app.use('/api/tratamientos', tratamientosRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Apiarium backend corriendo en http://localhost:${PORT}`)
})
