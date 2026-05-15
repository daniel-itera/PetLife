using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using PetLife.Repositorio.DTOs;

namespace PetLife.Aplicacao.Interfaces
{
    public interface IPetsAplicacao
    {
        Task<IEnumerable<Pets>> BuscarPetsAtivosPorTipoAsync(TipoPet tipo);
        Task CadastrarPetAsync(Pets pet);
        Task<IEnumerable<Pets>> BuscarPetsComDonoAsync(int usuarioId);
        Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId);
        Task InativarPetAsync(int petId);
        Task<Pets?> BuscarPetPorIdAsync(int petId);
        Task AtualizarPetAsync(Pets pet);
    }
}