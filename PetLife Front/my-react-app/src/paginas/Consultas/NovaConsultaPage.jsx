import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { buscarPets } from '../../servicos/petService'
import { addConsulta, updateConsulta } from '../../servicos/consultaService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './NovaConsultaPage.module.css'

export default function NovaConsultaPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const editData = location.state?.consulta
  const isEdit = !!editData

  const [loading, setLoading] = useState(false)
  const [pets, setPets] = useState([])
  const [formData, setFormData] = useState({
    id: editData?.id || '',
    petId: editData?.petId || '',
    veterinario: editData?.veterinario || '',
    data: editData?.dataConsulta ? editData.dataConsulta.split('T')[0] : new Date().toISOString().split('T')[0],
    motivo: editData?.motivo || '',
    diagnostico: editData?.diagnostico || ''
  })

  useEffect(() => {
    buscarPets().then(data => {
      setPets(data || [])
      // Se não for edição e tiver pets, pré-seleciona o primeiro
      if (!isEdit && data && data.length > 0 && !formData.petId) {
        setFormData(prev => ({ ...prev, petId: data[0].id }))
      }
    })
  }, [isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.petId) return alert("Selecione um pet.")
    setLoading(true)
    try {
      const payload = {
        Id: isEdit ? Number(formData.id) : undefined,
        PetId: Number(formData.petId),
        Veterinario: formData.veterinario,
        DataConsulta: formData.data,
        Motivo: formData.motivo,
        Diagnostico: formData.diagnostico || '—'
      }

      if (isEdit) {
        await updateConsulta(payload)
        alert("Consulta atualizada com sucesso!")
      } else {
        await addConsulta(payload)
        alert("Consulta registrada com sucesso!")
      }
      navigate('/consultas')
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message)
      alert(`Erro ao ${isEdit ? 'atualizar' : 'registrar'} a consulta.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>{isEdit ? 'Editar Consulta' : 'Agendar Consulta'}</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGroupRow}>
          <div className={styles.formCol}>
            <label className={styles.label}>Pet</label>
            <select disabled={isEdit} value={formData.petId} onChange={e => setFormData({...formData, petId: e.target.value})} className={styles.input}>
              {pets.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>
          <div className={styles.formCol}>
            <label className={styles.label}>Data da Consulta</label>
            <input required type="date" value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} className={styles.input} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Veterinário</label>
          <input required type="text" value={formData.veterinario} onChange={e => setFormData({...formData, veterinario: e.target.value})} placeholder="Nome da clínica ou dr(a)." className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Motivo</label>
          <input required type="text" value={formData.motivo} onChange={e => setFormData({...formData, motivo: e.target.value})} placeholder="Ex: Rotina, vacinação, dor..." className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Diagnóstico</label>
          <textarea value={formData.diagnostico} onChange={e => setFormData({...formData, diagnostico: e.target.value})} placeholder="Ex: Saudável, suspeita de otite..." className={styles.input} rows="3" />
        </div>
        <div className={styles.btnGroup}>
          <button type="button" onClick={() => navigate(-1)} className={styles.btnCancel}>Cancelar</button>
          <button type="submit" disabled={loading || pets.length === 0} className={styles.btnSubmit}>
            {loading ? 'Salvando...' : (isEdit ? '💾 Salvar Alterações' : '🩺 Salvar Consulta')}
          </button>
        </div>
      </form>
    </div>
  )
}
