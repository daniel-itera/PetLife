using System;

namespace PetLife.Api.Models.Vacinas
{
    public class VacinaRequest
    {
        public int? Id { get; set; }
        public string Nome { get; set; }        
        public string Fabricante { get; set; }
        public DateTime DataAplicacao { get; set; }
        public int PetId { get; set; }
    }
}
