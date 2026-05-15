namespace PetLife.Repositorio.DTOs
{
    public class PetComVacinasDTO
    {
        public int PetId { get; set; }
        public string NomePet { get; set; }
        public int VacinaId { get; set; }
        public string NomeVacina { get; set; }
        public DateTime DataAplicacao { get; set; }
        public string? Fabricante { get; set; }
    }
}