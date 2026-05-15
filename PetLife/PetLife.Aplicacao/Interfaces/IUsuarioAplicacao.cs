using PetLife.Dominio.Entidades;

namespace PetLife.Aplicacao.Interfaces
{
    public interface IUsuarioAplicacao
    {
        Task CadastrarUsuarioAsync(Usuarios usuario);
        Task<string?> LoginAsync(string email, string senha, string jwtKey);
    }
}
