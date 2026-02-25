import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const colmenasApi = {
  getAll: () => client.get('/colmenas'),
  getById: (id) => client.get(`/colmenas/${id}`),
  create: (data) => client.post('/colmenas', data),
  update: (id, data) => client.put(`/colmenas/${id}`, data),
  remove: (id) => client.delete(`/colmenas/${id}`),
}

export const recoleccionesApi = {
  getAll: (colmena_id) => client.get('/recolecciones', { params: colmena_id ? { colmena_id } : {} }),
  create: (data) => client.post('/recolecciones', data),
  remove: (id) => client.delete(`/recolecciones/${id}`),
}

export const inspeccionesApi = {
  getAll: (colmena_id) => client.get('/inspecciones', { params: colmena_id ? { colmena_id } : {} }),
  create: (data) => client.post('/inspecciones', data),
  remove: (id) => client.delete(`/inspecciones/${id}`),
}

export const tratamientosApi = {
  getAll: (colmena_id) => client.get('/tratamientos', { params: colmena_id ? { colmena_id } : {} }),
  create: (data) => client.post('/tratamientos', data),
  remove: (id) => client.delete(`/tratamientos/${id}`),
}

export default client
