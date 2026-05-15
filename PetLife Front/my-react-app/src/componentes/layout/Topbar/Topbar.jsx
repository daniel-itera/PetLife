import { useLocation, useNavigate } from 'react-router-dom'
import Button  from '../../ui/Button'
import styles  from './Topbar.module.css'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard',  sub: 'Visão geral da sua conta' },
  '/pets':      { title: 'Meus Pets',  sub: 'Gerencie seus companheiros' },
  '/vacinas':   { title: 'Vacinas',    sub: 'Calendário de vacinação' },
  '/consultas': { title: 'Consultas',  sub: 'Histórico médico' },
  '/alimentacao':{ title: 'Dieta',      sub: 'Controle alimentar' },
  '/ai':        { title: 'Assistente IA', sub: 'Tire suas dúvidas' }
}

export default function Topbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // título dinâmico: tenta match exato, depois match de prefixo
  const info =
    PAGE_TITLES[pathname] ??
    Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] ??
    { title: 'PetLife', sub: '' }

  // Formata data atual em português
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.headerTitle}>{info.title}</h1>
        <p className={styles.headerSub}>{info.sub || today}</p>
      </div>
      <div className={styles.headerActions}>
        <button className={styles.notifBtn} title="Notificações">
          🔔
          <span className={styles.notifDot} />
        </button>
        {/* Usamos onClick para navegar de acordo com a rota atual ou sempre para pets/novo */}
        <Button onClick={() => navigate('/pets/novo')} size="sm">
          + Novo Pet
        </Button>
      </div>
    </header>
  )
}
