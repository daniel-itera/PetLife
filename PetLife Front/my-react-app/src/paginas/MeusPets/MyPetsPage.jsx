import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import PetCard from '../../componentes/pets/PetCard'
import Button  from '../../componentes/ui/Button'
import styles  from './MyPets.module.css'

const FILTERS = ['Todos', 'Cães 🐕', 'Gatos 🐈', 'Outros 🐇', '⚠ Pendentes']

const FILTER_MAP = {
  'Todos':       () => true,
  'Cães 🐕':    (p) => p.especie === 'Cão',
  'Gatos 🐈':   (p) => p.especie === 'Gato',
  'Outros 🐇':  (p) => !['Cão', 'Gato'].includes(p.especie),
  '⚠ Pendentes':(p) => p.status === 'pendente',
}

export default function MyPetsPage() {
  const navigate = useNavigate()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('Todos')
  const [pets, setPets]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    buscarPets()
      .then(data => setPets(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = pets.filter((pet) => {
    const matchSearch = pet.nome.toLowerCase().includes(search.toLowerCase()) ||
                        pet.raca.toLowerCase().includes(search.toLowerCase())
    const matchFilter = FILTER_MAP[filter]?.(pet) ?? true
    return matchSearch && matchFilter
  })

  if (loading) return <div className={styles.page}>Carregando pets...</div>

  return (
    <div className={styles.page}>
      {/* Filter bar */}
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar pet por nome ou raça…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterChip} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
          {/* Card "adicionar" */}
          <div className={styles.addCard} onClick={() => navigate('/pets/novo')}>
            <span className={styles.addIcon}>➕</span>
            <span className={styles.addLabel}>Adicionar Pet</span>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <span>🔍</span>
          <p>Nenhum pet encontrado para "{search}".</p>
          <Button variant="ghost" onClick={() => { setSearch(''); setFilter('Todos') }}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
