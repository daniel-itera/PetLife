import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth }     from '../../hooks/useAuth'
import { buscarPets }     from '../../servicos/petService'
import { buscarVacinas } from '../../servicos/vaccineService'
import { getConsultas } from '../../servicos/consultaService'
import { getAlimentacao } from '../../servicos/alimentacaoService'
import { askAi, coletarContextoPets } from '../../servicos/aiService'
import Badge  from '../../componentes/ui/Badge'
import styles from './Dashboard.module.css'

function formatNextVaccine(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function DashboardPage() {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const firstName  = user?.name?.split(' ')[0] ?? 'Tutor'

  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [aiSugestao, setAiSugestao] = useState('')
  const [aiLoading, setAiLoading] = useState(true)
  const [totalVacinas, setTotalVacinas] = useState(0)
  const [totalConsultas, setTotalConsultas] = useState(0)
  const [totalDietas, setTotalDietas] = useState(0)

  useEffect(() => {
    buscarPets()
      .then(async (data) => {
        setPets(data)
        // Buscar totais de vacinas, consultas e dietas
        let vacCount = 0, conCount = 0, dietCount = 0
        for (const pet of (data || [])) {
          try { const v = await buscarVacinas(pet.id); vacCount += v.length } catch {}
          try { const c = await getConsultas(pet.nome); conCount += (c || []).length } catch {}
          try { const d = await getAlimentacao(pet.id); dietCount += (d || []).length } catch {}
        }
        setTotalVacinas(vacCount)
        setTotalConsultas(conCount)
        setTotalDietas(dietCount)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))

    // Buscar sugestão da IA automaticamente
    coletarContextoPets().then(ctx => {
      askAi(
        'Analise os dados dos meus pets e me dê um resumo rápido com alertas e recomendações importantes. Seja breve e objetivo, use emojis para deixar amigável. Máximo 5 linhas.',
        ctx
      )
        .then(res => setAiSugestao(res))
        .catch(() => setAiSugestao('Não foi possível gerar sugestões agora.'))
        .finally(() => setAiLoading(false))
    })
  }, [])

  if (loading) return <div className={styles.page}>Carregando painel...</div>

  return (
    <div className={styles.page}>
      {/* Greeting banner */}
      <div className={styles.greeting}>
        <div className={styles.greetingText}>
          <h2>Olá, {firstName}! 👋</h2>
          <p>Seus pets estão te esperando. Acompanhe a saúde deles por aqui.</p>
        </div>
        <div className={styles.greetingAvatars}>
          {pets.map((p) => (
            <div key={p.id} className={styles.petAvatarSm}>{p.emoji}</div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard} onClick={() => navigate('/pets')}>
          <div className={`${styles.statIcon} ${styles.orange}`}>🐾</div>
          <div className={styles.statValue}>{pets.length}</div>
          <div className={styles.statLabel}>Pets cadastrados</div>
        </div>
        <div className={styles.statCard} onClick={() => navigate('/vacinas')}>
          <div className={`${styles.statIcon} ${styles.green}`}>💉</div>
          <div className={styles.statValue}>{totalVacinas}</div>
          <div className={styles.statLabel}>Vacinas aplicadas</div>
        </div>
        <div className={styles.statCard} onClick={() => navigate('/consultas')}>
          <div className={`${styles.statIcon} ${styles.blue}`}>🩺</div>
          <div className={styles.statValue}>{totalConsultas}</div>
          <div className={styles.statLabel}>Consultas realizadas</div>
        </div>
        <div className={styles.statCard} onClick={() => navigate('/alimentacao')}>
          <div className={`${styles.statIcon} ${styles.pink}`}>🍖</div>
          <div className={styles.statValue}>{totalDietas}</div>
          <div className={styles.statLabel}>Dietas cadastradas</div>
        </div>
      </div>

      {/* Main grid */}
      <div className={styles.mainGrid}>
        {/* Coluna esquerda: pets + ações */}
        <div>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Meus Pets</h3>
            <button className={styles.sectionLink} onClick={() => navigate('/pets')}>
              Ver todos →
            </button>
          </div>

          <div className={styles.petRows}>
            {pets.length === 0 && <p className={styles.emptyMsg}>Nenhum pet cadastrado.</p>}
            {pets.map((pet) => (
              <div
                key={pet.id}
                className={styles.petRow}
                onClick={() => navigate(`/pets/${pet.id}`)}
              >
                <div className={styles.petAvatar}>{pet.emoji}</div>
                <div className={styles.petInfo}>
                  <div className={styles.petName}>{pet.nome}</div>
                  <div className={styles.petMeta}>{pet.raca}</div>
                  <div className={styles.petBadges}>
                    <Badge variant={pet.status === 'ok' ? 'ok' : 'warning'}>
                      {pet.status === 'ok' ? '✓ Vacinado' : '⚠ Pendente'}
                    </Badge>
                    <Badge variant={pet.sexo === 'Macho' ? 'blue' : 'pink'}>
                      {pet.sexo}
                    </Badge>
                  </div>
                </div>
                <div className={styles.petNext}>
                  <div className={styles.nextLabel}>Próxima dose</div>
                  <div
                    className={`${styles.nextDate} ${pet.status === 'pendente' ? styles.nextDateUrgent : styles.nextDateOk}`}
                  >
                    {formatNextVaccine(pet.nextVaccine)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ações rápidas */}
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderMt}`}>
            <h3 className={styles.sectionTitle}>Ações Rápidas</h3>
          </div>
          <div className={styles.actionsGrid}>
            {[
              { icon: '➕', label: 'Registrar Vacina' },
              { icon: '🐾', label: 'Cadastrar Pet',  action: () => navigate('/pets') },
              { icon: '📋', label: 'Ver Histórico' },
              { icon: '📤', label: 'Exportar PDF'  },
            ].map(({ icon, label, action }) => (
              <div key={label} className={styles.actionChip} onClick={action}>
                <span className={styles.chipIcon}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita: sugestão IA + agenda */}
        <div>
          {/* Card de Sugestão da IA */}
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>🤖 Sugestão da IA</h3>
            <button className={styles.sectionLink} onClick={() => navigate('/ai')}>Perguntar mais →</button>
          </div>
          <div className={styles.aiCard}>
            {aiLoading ? (
              <p className={styles.aiLoading}>✨ Analisando seus pets...</p>
            ) : (
              <p className={styles.aiText}>{aiSugestao}</p>
            )}
          </div>

          {/* Próximas vacinas */}
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderMt}`}>
            <h3 className={styles.sectionTitle}>Próximas Vacinas</h3>
            <button className={styles.sectionLink} onClick={() => navigate('/vacinas')}>Ver agenda</button>
          </div>
          <div className={styles.agendaCard}>
            <p className={styles.emptyMsg}>Confira o calendário de vacinas na página de Vacinas.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
