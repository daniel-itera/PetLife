import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import { buscarVacinas } from '../../servicos/vaccineService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './VacinasPage.module.css'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export default function VacinasPage() {
  const navigate = useNavigate()
  const [vacinas, setVacinas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    buscarPets()
      .then(async (pets) => {
        const todas = []
        for (const pet of (pets || [])) {
          const vacinasPet = await buscarVacinas(pet.id)
          todas.push(...vacinasPet)
        }
        setVacinas(todas)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={dashboardStyles.page}>Carregando vacinas...</div>

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Calendário de Vacinas</h2>
        <button className={styles.addBtn} onClick={() => navigate('/vacinas/novo')}>
          + Nova Vacina
        </button>
      </div>

      {vacinas.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>💉</span>
          <p className={styles.emptyText}>Você não possui vacinas registradas ainda.</p>
          <button className={styles.emptyBtn} onClick={() => navigate('/vacinas/novo')}>
            Registrar Vacina
          </button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pet</th>
                <th>Vacina</th>
                <th>Fabricante</th>
                <th>Data de Aplicação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vacinas.map((v, i) => (
                <tr key={v.id || i}>
                  <td className={styles.petName}>{v.nomePet}</td>
                  <td>{v.nome}</td>
                  <td><code className={styles.badge}>{v.lote || '—'}</code></td>
                  <td>{formatDate(v.dataAplicacao)}</td>
                  <td>
                    <button 
                      className={styles.editBtn} 
                      onClick={() => navigate('/vacinas/novo', { state: { editMode: true, vaccine: v } })}
                    >
                      ✏️ Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
