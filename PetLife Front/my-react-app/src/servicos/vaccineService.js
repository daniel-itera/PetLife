import api from './api'

function mapVaccine(v) {
  return {
    id: v.id?.toString() || Math.random().toString(), // Backend não enviou ID na response mapeada, criando fallback
    nome: v.nomeVacina,
    lote: v.fabricante,
    dataAplicacao: v.dataAplicacao,
    proximaDose: null,
    veterinario: 'Não informado',
    status: 'ok',
    petId: v.petId,
    nomePet: v.nomePet
  }
}

export async function buscarVacinas(petId) {
  const { data } = await api.get(`/Vacinas/BuscarVacinasPorPet/${petId}`)
  return (data || []).map(mapVaccine)
}

export async function adicionarVacina(petId, vaccineData) {
  const payload = {
    Nome: vaccineData.nome,
    Fabricante: vaccineData.lote,
    DataAplicacao: vaccineData.dataAplicacao,
    PetId: petId
  }
  const { data } = await api.post('/Vacinas/RegistrarVacina', payload)
  return data
}

export async function atualizarVacina(vaccineData) {
  const payload = {
    Id: vaccineData.id,
    Nome: vaccineData.nome,
    Fabricante: vaccineData.lote,
    DataAplicacao: vaccineData.dataAplicacao,
    PetId: vaccineData.petId
  }
  const { data } = await api.put('/Vacinas/AtualizarVacina', payload)
  return data
}

export async function excluirVacina(petId, vaccineId) {
  await api.delete(`/Vacinas/ExcluirVacina/${vaccineId}`)
}
