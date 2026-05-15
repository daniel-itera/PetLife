import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contextos/AuthContext'
import { useAuth } from './hooks/useAuth'

import AppLayout      from './componentes/layout/AppLayout'
import AuthPage       from './paginas/Autenticacao/AuthPage'
import DashboardPage  from './paginas/Dashboard/DashboardPage'
import MyPetsPage     from './paginas/MeusPets/MyPetsPage'
import PetDetalhesPage from './paginas/DetalhesPet/PetDetalhesPage'
import VacinasPage    from './paginas/Vacinas/VacinasPage'
import ConsultasPage  from './paginas/Consultas/ConsultasPage'
import AlimentacaoPage from './paginas/Alimentacao/AlimentacaoPage'
import NovaAlimentacaoPage from './paginas/Alimentacao/NovaAlimentacaoPage'
import AiPage         from './paginas/Ai/AiPage'
import NovoPetPage      from './paginas/MeusPets/NovoPetPage'
import NovaVacinaPage   from './paginas/Vacinas/NovaVacinaPage'
import NovaConsultaPage from './paginas/Consultas/NovaConsultaPage'

// Rota privada: exige usuário autenticado
function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="full-screen-loader">Carregando...</div>
  if (!user)     return <Navigate to="/login" replace />
  return children
}

// Rota pública: redireciona para dashboard se já logado
function PublicRoute({ children }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (user)      return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Rotas públicas ──────────────────────────── */}
          <Route
            path="/login"
            element={<PublicRoute><AuthPage mode="login" /></PublicRoute>}
          />
          <Route
            path="/cadastro"
            element={<PublicRoute><AuthPage mode="register" /></PublicRoute>}
          />

          {/* ── Rotas privadas (dentro do AppLayout) ───── */}
          <Route
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard"   element={<DashboardPage />} />
            <Route path="/pets"        element={<MyPetsPage />} />
            <Route path="/pets/novo"   element={<NovoPetPage />} />
            <Route path="/pets/:petId" element={<PetDetalhesPage />} />
            <Route path="/vacinas"     element={<VacinasPage />} />
            <Route path="/vacinas/novo" element={<NovaVacinaPage />} />
            <Route path="/consultas"   element={<ConsultasPage />} />
            <Route path="/consultas/novo" element={<NovaConsultaPage />} />
            <Route path="/alimentacao" element={<AlimentacaoPage />} />
            <Route path="/alimentacao/novo" element={<NovaAlimentacaoPage />} />
            <Route path="/ai"          element={<AiPage />} />
          </Route>

          {/* ── Fallback ─────────────────────────────────── */}
          <Route path="/"  element={<Navigate to="/dashboard" replace />} />
          <Route path="*"  element={<Navigate to="/dashboard" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
