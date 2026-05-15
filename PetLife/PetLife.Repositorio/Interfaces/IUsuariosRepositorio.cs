using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Interfaces
{
    public interface IUsuarioRepositorio
    {
        Task CadastrarUsuarioAsync(Usuarios usuario);
        Task<Usuarios?> LoginAsync(string email, string senha);
    }
}
