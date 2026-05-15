using System;

namespace PetLife.Api.Models.Consultas
{
    public class ConsultaRequest
    {
        public int? Id { get; set; }
        public string Veterinario { get; set; }
        public string Diagnostico { get; set; }
        public string Motivo { get; set; }
        public DateTime DataConsulta { get; set; }
        public int PetId { get; set; }
    }
}
