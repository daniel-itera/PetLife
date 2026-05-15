using PetLife.Dominio.Enumeradores;

namespace PetLife.Api.Models.Usuarios
{
    public class UsuarioResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public TipoUsuario Tipo { get; set; }
        public bool Ativo { get; set; }
    }
}
