using System;
using System.Collections.Generic;

namespace PetLife.Api.Models.Alimentacao
{
    public class AlimentacaoRequest
    {
        public int? Id { get; set; }
        public string TipoAlimento { get; set; }
        public double Quantidade { get; set; }
        public List<TimeSpan> Horarios { get; set; }
        public int PetId { get; set; }
    }
}
