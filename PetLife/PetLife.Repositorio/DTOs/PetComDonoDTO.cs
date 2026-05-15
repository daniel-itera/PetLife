namespace PetLife.Repositorio.DTOs
{
    public class PetComDonoDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Raca { get; set; }
        public int Idade { get; set; }
        public double Peso { get; set; }
        public int Tipo { get; set; }
        public bool Ativo { get; set; }
        public string NomeDono { get; set; }
        public string EmailDono { get; set; }
    }
}