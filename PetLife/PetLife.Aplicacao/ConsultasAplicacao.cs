using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using PetLife.Repositorio.DTOs;
using PetLife.Repositorio.Interfaces;

namespace PetLife.Aplicacao
{
    public class ConsultasAplicacao : IConsultasAplicacao
    {
        private readonly IConsultasRepositorio _consultasRepositorio;

        public ConsultasAplicacao(IConsultasRepositorio consultasRepositorio)
        {
            _consultasRepositorio = consultasRepositorio;
        }

        public async Task<IEnumerable<HistoricoConsultaDTO>> BuscarConsultasPorPetAsync(string nomePet)
        {
            if (string.IsNullOrWhiteSpace(nomePet))
                throw new ArgumentException("O nome do pet não pode ser vazio.");

            return await _consultasRepositorio.BuscarConsultasPorPetAsync(nomePet);
        }

        public async Task RegistrarConsultaAsync(Consultas consulta)
        {
            if (consulta == null)
                throw new ArgumentException("Dados inválidos");

            await _consultasRepositorio.RegistrarConsultaAsync(consulta);
        }
        public async Task AtualizarConsultaAsync(Consultas consulta)
        {
            if (consulta == null)
                throw new ArgumentException("Dados inválidos");

            await _consultasRepositorio.AtualizarConsultaAsync(consulta);
        }
    }
}
