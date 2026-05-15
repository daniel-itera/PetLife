using PetLife.Dominio.Entidades;
using PetLife.Repositorio.DTOs;

namespace PetLife.Repositorio.Interfaces
{
    public interface IConsultasRepositorio
    {
        Task RegistrarConsultaAsync(Consultas consulta);
        Task<IEnumerable<HistoricoConsultaDTO>> BuscarConsultasPorPetAsync(string nomePet);
        Task AtualizarConsultaAsync(Consultas consulta);
    }
}
