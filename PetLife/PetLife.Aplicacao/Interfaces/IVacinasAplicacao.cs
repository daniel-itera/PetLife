using PetLife.Dominio.Entidades;
using PetLife.Repositorio.DTOs;

namespace PetLife.Aplicacao.Interfaces
{
    public interface IVacinasAplicacao
    {
        Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId);
        Task RegistrarVacinaAsync(Vacinas vacina);
        Task AtualizarVacinaAsync(Vacinas vacina);
    }
}
