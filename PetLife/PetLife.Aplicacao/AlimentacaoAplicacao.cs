using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using PetLife.Repositorio.Interfaces;

namespace PetLife.Aplicacao
{
    public class AlimentacaoAplicacao : IAlimentacaoAplicacao
    {
        private readonly IAlimentacaoRepositorio _alimentacaoRepositorio;

        public AlimentacaoAplicacao(IAlimentacaoRepositorio alimentacaoRepositorio)
        {
            _alimentacaoRepositorio = alimentacaoRepositorio;
        }

        public async Task<IEnumerable<Alimentacao>> BuscarAlimentacaoPorPetAsync(int petId)
        {
            if (petId <= 0)
                throw new ArgumentException("ID do pet inválido.");

            return await _alimentacaoRepositorio.BuscarAlimentacaoPorPetAsync(petId);
        }

        public async Task RegistrarAlimentacaoAsync(Alimentacao alimentacao)
        {
            if (alimentacao == null)
                throw new ArgumentException("Alimentação inválida.");

            await _alimentacaoRepositorio.RegistrarAlimentacaoAsync(alimentacao);
        }
            
        public async Task AtualizarAlimentacaoAsync(Alimentacao alimentacao)
        {
            if (alimentacao == null)
                throw new ArgumentException("Alimentação inválida.");

            await _alimentacaoRepositorio.AtualizarAlimentacaoAsync(alimentacao);
        }
    }
}
