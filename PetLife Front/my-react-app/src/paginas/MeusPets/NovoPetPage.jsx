import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { criarPet, atualizarPet } from '../../servicos/petService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './NovoPetPage.module.css'

export default function NovoPetPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const editData = location.state?.pet
  const isEdit = !!editData

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: editData?.nome || '', 
    raca: editData?.raca || '', 
    peso: editData?.peso || '', 
    dataNascimento: editData?.dataNascimento ? editData.dataNascimento.split('T')[0] : '', 
    especie: editData?.especie || 'Cão', 
    genero: editData?.genero?.toString() || '1'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEdit) {
        await atualizarPet(editData.id, formData)
        alert("Pet atualizado com sucesso!")
      } else {
        await criarPet(formData)
        alert("Pet cadastrado com sucesso!")
      }
      navigate('/pets')
    } catch (error) {
      console.error(error)
      alert(`Erro ao ${isEdit ? 'atualizar' : 'cadastrar'} o pet.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>
          {isEdit ? `Editar ${editData.nome}` : 'Cadastrar Novo Pet'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome do Pet</label>
          <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className={styles.input} />
        </div>
        <div className={styles.formGroupRow}>
          <div className={styles.formCol}>
            <label className={styles.label}>Espécie</label>
            <select value={formData.especie} onChange={e => setFormData({...formData, especie: e.target.value})} className={styles.input}>
              <option>Cão</option>
              <option>Gato</option>
              <option>Outro</option>
            </select>
          </div>
          <div className={styles.formCol}>
            <label className={styles.label}>Sexo</label>
            <select value={formData.genero} onChange={e => setFormData({...formData, genero: e.target.value})} className={styles.input}>
              <option value="1">Macho</option>
              <option value="2">Fêmea</option>
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Raça</label>
          <input required type="text" value={formData.raca} onChange={e => setFormData({...formData, raca: e.target.value})} className={styles.input} />
        </div>
        <div className={styles.formGroupRow}>
          <div className={styles.formCol}>
            <label className={styles.label}>Peso (kg)</label>
            <input required type="number" step="0.1" value={formData.peso} onChange={e => setFormData({...formData, peso: parseFloat(e.target.value)})} className={styles.input} />
          </div>
          <div className={styles.formCol}>
            <label className={styles.label}>Data de Nascimento</label>
            <input required type="date" value={formData.dataNascimento} onChange={e => setFormData({...formData, dataNascimento: e.target.value})} className={styles.input} />
          </div>
        </div>
        <div className={styles.btnGroup}>
          <button type="button" onClick={() => navigate(-1)} className={styles.btnCancel}>Cancelar</button>
          <button type="submit" disabled={loading} className={styles.btnSubmit}>
            {loading ? 'Salvando...' : '🐾 Salvar Pet'}
          </button>
        </div>
      </form>
    </div>
  )
}
