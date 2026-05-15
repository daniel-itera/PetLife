import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import { getAlimentacao } from '../../servicos/alimentacaoService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './AlimentacaoPage.module.css'

function formatHorarios(horarios) {
  if (!horarios || horarios.length === 0) return '—'
  return horarios.map(h => {
    if (typeof h === 'string') {
      const parts = h.split(':')
      return `${parts[0]}:${parts[1]}`
    }
    return h
  }).join(', ')
}

export default function AlimentacaoPage() {
  const navigate = useNavigate()
  const [dietas, setDietas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    buscarPets()
      .then(async (pets) => {
        const todas = []
        for (const pet of (pets || [])) {
          try {
            const alimentacoes = await getAlimentacao(pet.id)
            const items = (alimentacoes || []).map(a => ({ ...a, nomePet: pet.nome }))
            todas.push(...items)
          } catch (e) { /* pet sem dieta */ }
        }
        setDietas(todas)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={dashboardStyles.page}>Carregando dietas...</div>

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Dieta e Alimentação</h2>
        <button className={styles.addBtn} onClick={() => navigate('/alimentacao/novo')}>
          + Nova Dieta
        </button>
      </div>

      {dietas.length === 0 ? (
        <div className={styles.emptyBox}>
          <span className={styles.emptyIcon}>🍖</span>
          <p className={styles.emptyText}>Configure a dieta dos seus pets para receber alertas.</p>
          <button className={styles.emptyBtn} onClick={() => navigate('/alimentacao/novo')}>
            Adicionar Dieta
          </button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pet</th>
                <th>Alimento</th>
                <th>Quantidade</th>
                <th>Horários</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dietas.map((d, i) => (
                <tr key={d.id || i}>
                  <td className={styles.petName}>{d.nomePet}</td>
                  <td>{d.tipoAlimento}</td>
                  <td>{d.quantidade} g</td>
                  <td>{formatHorarios(d.horarios)}</td>
                  <td>
                    <button 
                      className={styles.editBtn} 
                      onClick={() => navigate('/alimentacao/novo', { state: { editMode: true, dieta: d } })}
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
