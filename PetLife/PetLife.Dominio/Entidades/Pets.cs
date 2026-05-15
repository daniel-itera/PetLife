using PetLife.Dominio.Enumeradores;
namespace PetLife.Dominio.Entidades
{
    public class Pets
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Raca { get; set; }
        public double Peso { get; set; }
        public GeneroPet Genero { get; set; }
        public TipoPet Tipo { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataNascimento { get; set; }
        public List<Alimentacao> Alimentacoes { get; set; }
        public List<Vacinas> Vacinas { get; set; }
        public List<Consultas> Consultas { get; set; }
        public int UsuarioId { get; set; }
        public Usuarios Usuario { get; set; }

    }
}
