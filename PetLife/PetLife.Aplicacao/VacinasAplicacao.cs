using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using PetLife.Repositorio.DTOs;
using PetLife.Repositorio.Interfaces;

namespace PetLife.Aplicacao
{
    public class VacinasAplicacao : IVacinasAplicacao
    {
        private readonly IVacinasRepositorio _vacinasRepositorio;

        public VacinasAplicacao(IVacinasRepositorio vacinasRepositorio)
        {
            _vacinasRepositorio = vacinasRepositorio;
        }

        public async Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId)
        {
            if (petId <= 0)
                throw new ArgumentException("ID do pet inválido.");

            return await _vacinasRepositorio.BuscarVacinasPorPetAsync(petId);
        }

        public async Task RegistrarVacinaAsync(Vacinas vacina)
        {
            if (vacina == null)
                throw new ArgumentException("Vacina inválida.");

            await _vacinasRepositorio.RegistrarVacinaAsync(vacina);
        }

        public async Task AtualizarVacinaAsync(Vacinas vacina)
        {
            if (vacina == null)
                throw new ArgumentException("Vacina inválida.");

            await _vacinasRepositorio.AtualizarVacinaAsync(vacina);
        }
    }
}
