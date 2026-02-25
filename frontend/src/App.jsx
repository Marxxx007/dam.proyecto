import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Colmenas from './pages/Colmenas'
import ColmenaDetail from './pages/ColmenaDetail'
import Mapa from './pages/Mapa'
import Recolecciones from './pages/Recolecciones'
import Inspecciones from './pages/Inspecciones'
import Tratamientos from './pages/Tratamientos'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="colmenas" element={<Colmenas />} />
            <Route path="colmenas/:id" element={<ColmenaDetail />} />
            <Route path="mapa" element={<Mapa />} />
            <Route path="recolecciones" element={<Recolecciones />} />
            <Route path="inspecciones" element={<Inspecciones />} />
            <Route path="tratamientos" element={<Tratamientos />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
