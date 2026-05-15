import api from './api'
import { buscarPets } from './petService'
import { buscarVacinas } from './vaccineService'
import { getConsultas } from './consultaService'
import { getAlimentacao } from './alimentacaoService'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export async function coletarContextoPets() {
  try {
    const pets = await buscarPets()
    if (!pets || pets.length === 0) return 'Usuário não possui pets cadastrados.'

    const linhas = []

    for (const pet of pets) {
      linhas.push(`\n🐾 Pet: ${pet.nome} | Espécie: ${pet.especie} | Raça: ${pet.raca} | Sexo: ${pet.sexo} | Peso: ${pet.peso}kg | Nascimento: ${formatDate(pet.dataNascimento)}`)

      // Vacinas
      try {
        const vacinas = await buscarVacinas(pet.id)
        if (vacinas.length > 0) {
          linhas.push('  Vacinas:')
          vacinas.forEach(v => linhas.push(`    - ${v.nome} (${formatDate(v.dataAplicacao)}) Fabricante: ${v.lote || 'N/I'}`))
        } else {
          linhas.push('  Vacinas: Nenhuma registrada ⚠️')
        }
      } catch { linhas.push('  Vacinas: Não foi possível consultar') }

      // Consultas
      try {
        const consultas = await getConsultas(pet.nome)
        if (consultas && consultas.length > 0) {
          linhas.push('  Consultas:')
          consultas.forEach(c => linhas.push(`    - ${formatDate(c.dataConsulta)} | Motivo: ${c.motivo} | Diagnóstico: ${c.diagnostico || 'N/I'} | Vet: ${c.veterinario}`))
        } else {
          linhas.push('  Consultas: Nenhuma registrada')
        }
      } catch { linhas.push('  Consultas: Não foi possível consultar') }

      // Alimentação
      try {
        const dietas = await getAlimentacao(pet.id)
        if (dietas && dietas.length > 0) {
          linhas.push('  Alimentação:')
          dietas.forEach(d => {
            const horarios = (d.horarios || []).join(', ')
            linhas.push(`    - ${d.tipoAlimento} | ${d.quantidade}g | Horários: ${horarios || 'N/I'}`)
          })
        } else {
          linhas.push('  Alimentação: Nenhuma dieta cadastrada')
        }
      } catch { linhas.push('  Alimentação: Não foi possível consultar') }
    }

    return linhas.join('\n')
  } catch {
    return 'Não foi possível coletar dados dos pets.'
  }
}

export async function askAi(prompt, petContext) {
  const { data } = await api.post('/Ai/IA', { Prompt: prompt, PetContext: petContext })
  return data
}
