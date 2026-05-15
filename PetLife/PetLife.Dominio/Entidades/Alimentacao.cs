namespace  PetLife.Dominio.Entidades
{
    public class Alimentacao
    {
        public int Id { get; set; }
        public string TipoAlimento { get; set; }
        public double Quantidade { get; set; }
        public  List<TimeSpan> Horarios { get; set; }
        public int PetId { get; set; }
        public Pets Pet { get; set; }
    }
}