using PetLife.Dominio.Entidades;

namespace PetLife.Aplicacao.Interfaces
{
    public interface IAlimentacaoAplicacao
    {
        Task RegistrarAlimentacaoAsync(Alimentacao alimentacao);
        Task<IEnumerable<Alimentacao>> BuscarAlimentacaoPorPetAsync(int petId);
        Task AtualizarAlimentacaoAsync(Alimentacao alimentacao);
    }
}
