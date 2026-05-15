using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;


namespace PetLife.Dominio.Entidades
{
    public class Usuarios
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public TipoUsuario Tipo { get; set; }
        public List<Pets> Pets { get; set; }
        public bool Ativo { get; set; }

        public Usuarios()
        {
            Pets = new List<Pets>();
            Ativo = true;
        }

        public void Deletar()
        {
            Ativo = false;
        }
        public void Restaurar()
        {
            Ativo = true;
        }
    }
}