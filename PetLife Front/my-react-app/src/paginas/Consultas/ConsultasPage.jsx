import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import { getConsultas } from '../../servicos/consultaService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './ConsultasPage.module.css'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export default function ConsultasPage() {
  const navigate = useNavigate()
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    buscarPets()
      .then(async (pets) => {
        const todas = []
        for (const pet of (pets || [])) {
          try {
            const consultasPet = await getConsultas(pet.nome)
            todas.push(...(consultasPet || []))
          } catch (e) { /* pet sem consultas */ }
        }
        setConsultas(todas)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={dashboardStyles.page}>Carregando consultas...</div>

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Histórico de Consultas</h2>
        <button className={styles.addBtn} onClick={() => navigate('/consultas/novo')}>
          + Nova Consulta
        </button>
      </div>

      {consultas.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🩺</span>
          <p className={styles.emptyText}>Nenhuma consulta médica registrada.</p>
          <button className={styles.emptyBtn} onClick={() => navigate('/consultas/novo')}>
            Adicionar Consulta
          </button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pet</th>
                <th>Veterinário</th>
                <th>Motivo</th>
                <th>Diagnóstico</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((c) => (
                <tr key={c.id}>
                  <td className={styles.petName}>{c.nomePet}</td>
                  <td>{c.veterinario}</td>
                  <td>{c.motivo}</td>
                  <td>{c.diagnostico || '—'}</td>
                  <td>{formatDate(c.dataConsulta)}</td>
                  <td>
                    <button 
                      className={styles.editBtn} 
                      onClick={() => navigate('/consultas/novo', { state: { editMode: true, consulta: c } })}
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
