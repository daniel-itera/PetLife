namespace PetLife.Dominio.Entidades
{
    public class Vacinas
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Fabricante { get; set; }
        public DateTime DataAplicacao { get; set; }
        public int PetId { get; set; }
        public Pets Pet { get; set; }
    }
}