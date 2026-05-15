import api from './api'

function mapPet(p) {
  const isDog = p.tipo === 1;
  const isCat = p.tipo === 2;
  const macho = p.genero === 1 ;
  const femea = p.genero === 2 ;
  return {
    id: p.id?.toString(),
    nome: p.nome,
    raca: p.raca,
    dataNascimento: p.dataNascimento,
    peso: p.peso,
    especie: isDog ? 'Cão' : (isCat ? 'Gato' : 'Outro'),
    sexo: macho ? 'Macho' : (femea ? 'Fêmea' : 'Não informado'),
    status: p.ativo ? 'ok' : 'pendente',
    emoji: isDog ? '🐕' : (isCat ? '🐈' : '🐇'),
    corBanner: isDog 
      ? 'linear-gradient(135deg,#f5ead6,#e8d4b0)' 
      : (isCat ? 'linear-gradient(135deg,#fce8ef,#f5c0d1)' : 'linear-gradient(135deg,#e8f5ea,#c0dd97)')
  }
}

export async function buscarPets() {
  const { data } = await api.get('/Pets/BuscarPetsComDono')
  return (data || []).map(mapPet)
}

export async function buscarPetPorId(petId) {
  const { data } = await api.get(`/Pets/BuscarPetPorId/${petId}`)
  return data ? mapPet(data) : null
}

export async function criarPet(petData) {
  const payload = {
    Nome: petData.nome,
    Raca: petData.raca,
    Peso: petData.peso,
    DataNascimento: petData.dataNascimento ? `${petData.dataNascimento}T12:00:00.000Z` : null,
    Tipo: petData.especie === 'Gato' ? 2 : (petData.especie === 'Cão' ? 1 : 3),
    Genero: parseInt(petData.genero, 10),
    UsuarioId: 1 
  }
  const { data } = await api.post('/Pets/CadastrarPet', payload)
  return data
}

export async function atualizarPet(petId, petData) {
  const payload = {
    Nome: petData.nome || petData.Nome,
    Raca: petData.raca || petData.Raca,
    Peso: petData.peso || petData.Peso,
    DataNascimento: petData.dataNascimento 
      ? (petData.dataNascimento.includes('T') ? petData.dataNascimento : `${petData.dataNascimento}T12:00:00.000Z`) 
      : petData.DataNascimento,
    Tipo: petData.especie === 'Gato' ? 2 : (petData.especie === 'Cão' ? 1 : (petData.Tipo || 3)),
    Genero: petData.genero ? parseInt(petData.genero, 10) : (petData.Genero || 1),
    UsuarioId: petData.UsuarioId || 1
  }
  const { data } = await api.put(`/Pets/AtualizarPet/${petId}`, payload)
  return data
}

export async function inativarPet(petId) {
  await api.delete(`/Pets/InativarPet/${petId}`)
}
