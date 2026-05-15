using PetLife.Dominio.Enumeradores;
using System;

namespace PetLife.Api.Models.Pets
{
    public class PetResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Raca { get; set; }
        public double Peso { get; set; }
        public GeneroPet Genero { get; set; }
        public TipoPet Tipo { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataNascimento { get; set; }
        public int UsuarioId { get; set; }
    }
}
