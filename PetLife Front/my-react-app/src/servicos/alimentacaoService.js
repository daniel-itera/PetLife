import api from './api'

export async function getAlimentacao(petId) {
  const { data } = await api.get(`/Alimentacao/BuscarAlimentacaoPorPet/${petId}`)
  return data
}

export async function addAlimentacao(alimentacaoData) {
  const { data } = await api.post('/Alimentacao/RegistrarAlimentacao', alimentacaoData)
  return data
}

export async function updateAlimentacao(alimentacaoData) {
  const { data } = await api.put('/Alimentacao/AtualizarAlimentacao', alimentacaoData)
  return data
}
