using PetLife.Dominio.Entidades;
using PetLife.Repositorio.DTOs;

namespace PetLife.Repositorio.Interfaces
{
    public interface IVacinasRepositorio
    {
        Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId);
        Task RegistrarVacinaAsync(Vacinas vacina);
        Task AtualizarVacinaAsync(Vacinas vacina);
    }
}
