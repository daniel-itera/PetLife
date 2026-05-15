import api from './api'

function mapConsulta(c) {
  return {
    id: (c.id ?? c.Id)?.toString(),
    petId: (c.petId ?? c.PetId)?.toString(),
    nomePet: c.nomePet ?? c.NomePet,
    veterinario: c.veterinario ?? c.Veterinario,
    motivo: c.motivo ?? c.Motivo,
    diagnostico: c.diagnostico ?? c.Diagnostico,
    dataConsulta: c.dataConsulta ?? c.DataConsulta
  }
}

export async function getConsultas(nomePet) {
  const { data } = await api.get(`/Consultas/BuscarConsultasPorPet/${nomePet}`)
  return (data || []).map(mapConsulta)
}

export async function addConsulta(consultaData) {
  const { data } = await api.post('/Consultas/RegistrarConsulta', consultaData)
  return data
}

export async function updateConsulta(consultaData) {
  const { data } = await api.put('/Consultas/AtualizarConsulta', consultaData)
  return data
}
