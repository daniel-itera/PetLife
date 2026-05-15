import { useNavigate } from 'react-router-dom'
import Badge   from '../ui/Badge'
import styles  from './PetCard.module.css'

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

export default function PetCard({ pet }) {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/pets/${pet.id}`)}>
      {/* Banner colorido */}
      <div className={styles.banner} style={{ background: pet.corBanner }}>
        <span className={styles.emoji}>{pet.emoji}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{pet.nome}</h3>
        <p className={styles.breed}>{pet.raca}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Idade</span>
            <span className={styles.statValue}>{calcAge(pet.dataNascimento)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Peso</span>
            <span className={styles.statValue}>{pet.peso ? `${pet.peso} kg` : '—'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Sexo</span>
            <span className={styles.statValue}>{pet.sexo}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Espécie</span>
            <span className={styles.statValue}>{pet.especie}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <Badge variant={pet.status === 'ok' ? 'ok' : 'warning'}>
            {pet.status === 'ok' ? '✓ Em dia' : '⚠ Pendente'}
          </Badge>
          <button className={styles.detailsLink}>
            Ver detalhes →
          </button>
        </div>
      </div>
    </div>
  )
}
