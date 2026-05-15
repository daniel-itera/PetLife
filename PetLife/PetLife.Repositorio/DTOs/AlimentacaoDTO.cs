namespace PetLife.Repositorio.DTOs
{
    public class AlimentacaoDTO
    {
        public int Id { get; set; }
        public string TipoAlimento { get; set; }
        public double Quantidade { get; set; }
        public string Horarios { get; set; }
        public int PetId { get; set; }
    }
}
