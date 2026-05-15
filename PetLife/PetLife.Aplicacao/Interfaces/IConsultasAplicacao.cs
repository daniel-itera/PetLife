using PetLife.Dominio.Entidades;
using PetLife.Repositorio.DTOs;

namespace PetLife.Aplicacao.Interfaces
{
    public interface IConsultasAplicacao
    {
        Task RegistrarConsultaAsync(Consultas consulta);
        Task<IEnumerable<HistoricoConsultaDTO>> BuscarConsultasPorPetAsync(string nomePet);
        Task AtualizarConsultaAsync(Consultas consulta);
    }
}
