import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import { adicionarVacina, atualizarVacina } from '../../servicos/vaccineService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './NovaVacinaPage.module.css'

export default function NovaVacinaPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const editData = location.state?.vaccine
  const isEdit = !!editData

  const [loading, setLoading] = useState(false)
  const [pets, setPets] = useState([])
  const [formData, setFormData] = useState({
    id: editData?.id || '',
    petId: editData?.petId || '',
    nome: editData?.nome || '',
    lote: editData?.lote || '',
    dataAplicacao: editData?.dataAplicacao ? editData.dataAplicacao.split('T')[0] : new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    buscarPets().then(data => {
      setPets(data || [])
      if (!isEdit && data && data.length > 0) {
        setFormData(prev => ({ ...prev, petId: data[0].id }))
      }
    })
  }, [isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.petId) return alert("Selecione um pet.")
    setLoading(true)
    try {
      if (isEdit) {
        await atualizarVacina(formData)
        alert("Vacina atualizada com sucesso!")
      } else {
        await adicionarVacina(formData.petId, formData)
        alert("Vacina registrada com sucesso!")
      }
      navigate('/vacinas')
    } catch (error) {
      console.error(error)
      alert(`Erro ao ${isEdit ? 'atualizar' : 'registrar'} a vacina.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>{isEdit ? 'Editar Vacina' : 'Registrar Vacina'}</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Pet</label>
          <select 
            disabled={isEdit} 
            value={formData.petId} 
            onChange={e => setFormData({...formData, petId: e.target.value})} 
            className={styles.input}
          >
            {pets.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
          {isEdit && <small className={styles.helperText}>O pet não pode ser alterado após o registro.</small>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome da Vacina</label>
          <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: V8, Antirrábica" className={styles.input} />
        </div>
        <div className={styles.formGroupRow}>
          <div className={styles.formCol}>
            <label className={styles.label}>Fabricante/Lote</label>
            <input required type="text" value={formData.lote} onChange={e => setFormData({...formData, lote: e.target.value})} className={styles.input} />
          </div>
          <div className={styles.formCol}>
            <label className={styles.label}>Data de Aplicação</label>
            <input required type="date" value={formData.dataAplicacao} onChange={e => setFormData({...formData, dataAplicacao: e.target.value})} className={styles.input} />
          </div>
        </div>
        <div className={styles.btnGroup}>
          <button type="button" onClick={() => navigate(-1)} className={styles.btnCancel}>Cancelar</button>
          <button type="submit" disabled={loading || pets.length === 0} className={styles.btnSubmit}>
            {loading ? 'Salvando...' : (isEdit ? '💾 Salvar Alterações' : '💉 Registrar Vacina')}
          </button>
        </div>
      </form>
    </div>
  )
}
