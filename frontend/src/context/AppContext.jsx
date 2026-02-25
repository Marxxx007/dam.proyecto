import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { colmenasApi, recoleccionesApi, inspeccionesApi, tratamientosApi } from '../api/client'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [colmenas, setColmenas] = useState([])
  const [recolecciones, setRecolecciones] = useState([])
  const [inspecciones, setInspecciones] = useState([])
  const [tratamientos, setTratamientos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [c, r, i, t] = await Promise.all([
        colmenasApi.getAll(),
        recoleccionesApi.getAll(),
        inspeccionesApi.getAll(),
        tratamientosApi.getAll(),
      ])
      setColmenas(c.data)
      setRecolecciones(r.data)
      setInspecciones(i.data)
      setTratamientos(t.data)
    } catch (err) {
      setError('Error al cargar los datos. ¿Está el backend en marcha?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const refreshColmenas = async () => {
    const { data } = await colmenasApi.getAll()
    setColmenas(data)
  }

  const refreshRecolecciones = async () => {
    const { data } = await recoleccionesApi.getAll()
    setRecolecciones(data)
  }

  const refreshInspecciones = async () => {
    const { data } = await inspeccionesApi.getAll()
    setInspecciones(data)
  }

  const refreshTratamientos = async () => {
    const { data } = await tratamientosApi.getAll()
    setTratamientos(data)
  }

  return (
    <AppContext.Provider value={{
      colmenas, recolecciones, inspecciones, tratamientos,
      loading, error,
      refreshColmenas, refreshRecolecciones, refreshInspecciones, refreshTratamientos,
      fetchAll,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
