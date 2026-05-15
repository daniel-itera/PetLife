namespace PetLife.Dominio.Entidades
{
    public class Consultas
    {
        public int Id { get; set; }
        public string Veterinario { get; set; }
        public string Diagnostico { get; set; }
        public string Motivo { get; set; }
        public DateTime DataConsulta { get; set; }
        public int PetId { get; set; }
        public Pets Pet { get; set; }
    }
}