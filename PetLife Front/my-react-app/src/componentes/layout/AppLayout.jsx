import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Header  from './Topbar/Topbar'
import styles  from './Layout.module.css'

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.body}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
