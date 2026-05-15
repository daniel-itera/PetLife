using PetLife.Dominio.Enumeradores;
using System;

namespace PetLife.Api.Models.Pets
{
    public class PetRequest
    {
        public string Nome { get; set; }
        public string Raca { get; set; }
        public double Peso { get; set; }
        public GeneroPet Genero { get; set; }
        public TipoPet Tipo { get; set; }
        public DateTime DataNascimento { get; set; }
        public int UsuarioId { get; set; }
    }
}
