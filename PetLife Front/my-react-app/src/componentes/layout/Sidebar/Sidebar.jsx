import { NavLink } from 'react-router-dom'
import { useAuth }  from '../../../hooks/useAuth'
import styles       from './Sidebar.module.css'

const NAV_ITEMS = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/pets',      icon: '🐶', label: 'Meus Pets'  },
  { to: '/vacinas',   icon: '💉', label: 'Vacinas' },
  { to: '/consultas', icon: '🩺', label: 'Consultas' },
  { to: '/alimentacao',icon: '🍖', label: 'Dieta' },
  { to: '/ai',        icon: '✨', label: 'IA Vet' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U'

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>🐾</div>
        <div>
          <div className={styles.brandName}>PetLife</div>
          <div className={styles.brandTagline}>Saúde Animal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <span className={styles.navSection}>Menu</span>
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <span className={styles.navIcon}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer com usuário */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userChip}>
          <div className={styles.userAvatar}>{initials}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name ?? 'Usuário'}</span>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={logout} title="Sair">
          Sair
        </button>
      </div>
    </aside>
  )
}
