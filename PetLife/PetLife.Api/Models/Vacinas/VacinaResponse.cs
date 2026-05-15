using System;

namespace PetLife.Api.Models.Vacinas
{
    public class VacinaResponse
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public string NomePet { get; set; }
        public string NomeVacina { get; set; }
        public DateTime DataAplicacao { get; set; }
        public string Fabricante { get; set; }
    }
}
