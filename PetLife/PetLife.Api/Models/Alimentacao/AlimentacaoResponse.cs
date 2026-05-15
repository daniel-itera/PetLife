using System;
using System.Collections.Generic;

namespace PetLife.Api.Models.Alimentacao
{
    public class AlimentacaoResponse
    {
        public int Id { get; set; }
        public string TipoAlimento { get; set; }
        public double Quantidade { get; set; }
        public List<string> Horarios { get; set; }
        public int PetId { get; set; }
    }
}
