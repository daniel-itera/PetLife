namespace PetLife.Repositorio.DTOs
{
    public class HistoricoConsultaDTO
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public string NomePet { get; set; }
        public string Veterinario { get; set; }
        public string Diagnostico { get; set; }
        public string Motivo { get; set; }
        public DateTime DataConsulta { get; set; }
    }
}