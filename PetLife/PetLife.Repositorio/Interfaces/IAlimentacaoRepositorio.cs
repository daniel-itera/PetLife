using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Interfaces
{
    public interface IAlimentacaoRepositorio
    {
        Task RegistrarAlimentacaoAsync(Alimentacao alimentacao);
        Task<IEnumerable<Alimentacao>> BuscarAlimentacaoPorPetAsync(int petId);
        Task AtualizarAlimentacaoAsync(Alimentacao alimentacao);
    }
}
