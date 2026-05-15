import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import { addAlimentacao, updateAlimentacao } from '../../servicos/alimentacaoService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './NovaAlimentacaoPage.module.css'

export default function NovaAlimentacaoPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const editData = location.state?.dieta
  const isEdit = !!editData

  const [loading, setLoading] = useState(false)
  const [pets, setPets] = useState([])
  const [formData, setFormData] = useState({
    id: editData?.id || '',
    petId: editData?.petId || '',
    alimento: editData?.tipoAlimento || '',
    quantidade: editData?.quantidade || ''
  })
  const [horarios, setHorarios] = useState(
    editData?.horarios?.map(h => h.substring(0, 5)) || ['08:00']
  )

  useEffect(() => {
    buscarPets().then(data => {
      setPets(data || [])
      if (!isEdit && data && data.length > 0) {
        setFormData(prev => ({ ...prev, petId: data[0].id }))
      }
    })
  }, [isEdit])

  const addHorario = () => setHorarios([...horarios, '12:00'])
  const removeHorario = (index) => {
    if (horarios.length <= 1) return
    setHorarios(horarios.filter((_, i) => i !== index))
  }
  const updateHorario = (index, value) => {
    const updated = [...horarios]
    updated[index] = value
    setHorarios(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.petId && !isEdit) return alert("Selecione um pet.")
    if (horarios.some(h => !h)) return alert("Preencha todos os horários.")
    setLoading(true)
    try {
      const payload = {
        Id: isEdit ? formData.id : undefined,
        TipoAlimento: formData.alimento,
        Quantidade: parseFloat(formData.quantidade),
        Horarios: horarios.map(h => h.length === 5 ? h + ':00' : h),
        PetId: parseInt(formData.petId, 10)
      }

      if (isEdit) {
        await updateAlimentacao(payload)
        alert("Dieta atualizada com sucesso!")
      } else {
        await addAlimentacao(payload)
        alert("Dieta registrada com sucesso!")
      }
      navigate('/alimentacao')
    } catch (error) {
      console.error(error)
      alert(`Erro ao ${isEdit ? 'atualizar' : 'registrar'} a dieta.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>{isEdit ? 'Editar Dieta' : 'Adicionar Dieta'}</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Pet</label>
          <select disabled={isEdit} value={formData.petId} onChange={e => setFormData({...formData, petId: e.target.value})} className={styles.input}>
            {pets.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome do Alimento</label>
          <input required type="text" value={formData.alimento} onChange={e => setFormData({...formData, alimento: e.target.value})} placeholder="Ex: Ração Golden, Sachê Whiskas" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Quantidade (g)</label>
          <input required type="number" value={formData.quantidade} onChange={e => setFormData({...formData, quantidade: e.target.value})} placeholder="Ex: 100" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Horários de Alimentação</label>
          {horarios.map((h, i) => (
            <div key={i} className={styles.horarioRow}>
              <input
                required
                type="time"
                value={h}
                onChange={e => updateHorario(i, e.target.value)}
                className={styles.input}
              />
              {horarios.length > 1 && (
                <button type="button" onClick={() => removeHorario(i)} className={styles.btnRemoveHorario}>✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addHorario} className={styles.btnAddHorario}>
            + Adicionar horário
          </button>
        </div>

        <div className={styles.btnGroup}>
          <button type="button" onClick={() => navigate(-1)} className={styles.btnCancel}>Cancelar</button>
          <button type="submit" disabled={loading || pets.length === 0} className={styles.btnSubmit}>
            {loading ? 'Salvando...' : (isEdit ? '💾 Salvar Alterações' : '🍖 Salvar Dieta')}
          </button>
        </div>
      </form>
    </div>
  )
}
