namespace PetLife.Servico.Interfaces
{
    public interface IAiService
    {
        Task<string> GetAiResponseAsync(string prompt, string petContext = "");
    }
}
