import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarPetPorId, inativarPet }     from '../../servicos/petService'
import { buscarVacinas } from '../../servicos/vaccineService'
import VaccineTable from '../../componentes/pets/VaccineTable'
import Button       from '../../componentes/ui/Button'
import Badge        from '../../componentes/ui/Badge'
import styles       from './PetDetalhes.module.css'

function calcAge(dataNascimento) {
  if (!dataNascimento) return '—'
  const date = new Date(dataNascimento)
  if (isNaN(date.getTime()) || date.getFullYear() < 1900) return '—'
  
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const m = today.getMonth() - date.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--
  }
  return age <= 0 ? 'Menos de 1 ano' : `${age} ano${age > 1 ? 's' : ''}`
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export default function PetDetalhesPage() {
  const { petId }  = useParams()
  const navigate   = useNavigate()

  const [pet, setPet] = useState(null)
  const [vaccines, setVaccines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      buscarPetPorId(petId),
      buscarVacinas(petId)
    ])
      .then(([petData, vaccinesData]) => {
        setPet(petData)
        setVaccines(vaccinesData || [])
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [petId])

  const handleEdit = () => {
    navigate('/pets/novo', { state: { pet } })
  }

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir ${pet.nome}?`)) {
      try {
        await inativarPet(petId)
        alert("Pet excluído com sucesso!")
        navigate('/pets')
      } catch (error) {
        console.error(error)
        alert("Erro ao excluir o pet.")
      }
    }
  }

  if (loading) return <div className={styles.page}>Carregando detalhes...</div>
  if (!pet) return <div className={styles.page}>Pet não encontrado.</div>

  const coverageOk = vaccines.filter((v) => v.status !== 'expired').length
  const coverage   = vaccines.length > 0
    ? Math.round((coverageOk / vaccines.length) * 100)
    : 0

  const nextVaccine = vaccines.find((v) => v.status === 'warning' || v.status === 'ok')

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <button className={styles.backBtn} onClick={() => navigate('/pets')}>
          ← Voltar
        </button>
        <div className={styles.heroAvatar}>{pet.emoji}</div>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroName}>{pet.nome}</h1>
          <p className={styles.heroMeta}>
            {pet.raca} · {pet.sexo} · {calcAge(pet.dataNascimento)}
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>
              {pet.status === 'ok' ? '✓ Vacinado' : '⚠ Pendente'}
            </span>
            {pet.peso && <span className={styles.heroBadge}>{pet.peso} kg</span>}
            {pet.castrated && <span className={styles.heroBadge}>Castrado</span>}
          </div>
        </div>
        <div className={styles.heroActions}>
          <Button variant="ghost" onClick={handleEdit}>✏️ Editar</Button>
          <Button variant="danger" onClick={handleDelete}>🗑️ Excluir</Button>
          <Button onClick={() => navigate('/vacinas/novo', { state: { petId: pet.id } })}>+ Nova Vacina</Button>
        </div>
      </div>

      {/* Corpo */}
      <div className={styles.body}>
        <div className={styles.infoGrid}>
          {/* Informações gerais */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Informações Gerais</h3>
            {[
              ['Nome',          pet.nome],
              ['Espécie',       pet.especie],
              ['Raça',          pet.raca],
              ['Sexo',          pet.sexo],
              ['Data de Nasc.', formatDate(pet.dataNascimento)],
              ['Peso',          pet.peso ? `${pet.peso} kg` : '—'],
              ['Microchip',     pet.microchip ?? 'Não registrado'],
            ].map(([key, val]) => (
              <div key={key} className={styles.infoRow}>
                <span className={styles.infoKey}>{key}</span>
                <span className={styles.infoVal}>{val}</span>
              </div>
            ))}
          </div>

          {/* Saúde & Alertas */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Saúde &amp; Alertas</h3>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Status geral</span>
              <span className={`${styles.infoVal} ${styles.statusOk}`}>
                ✓ Saudável
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Próxima vacina</span>
              <span className={`${styles.infoVal} ${styles.dateAlert}`}>
                {nextVaccine ? formatDate(nextVaccine.proximaDose) : '—'}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Total de vacinas</span>
              <span className={styles.infoVal}>{vaccines.length}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Castrado</span>
              <span className={styles.infoVal}>{pet.castrated ? 'Sim' : 'Não'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Alergias</span>
              <span className={styles.infoVal}>Nenhuma</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Cobertura</span>
              <div className={styles.coverageWrap}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${coverage}%` }}
                  />
                </div>
                <span className={styles.infoVal}>{coverage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de vacinas */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Histórico de Vacinas</h3>
          <Button size="sm">+ Adicionar</Button>
        </div>
        <VaccineTable vaccines={vaccines} />
      </div>
    </div>
  )
}
