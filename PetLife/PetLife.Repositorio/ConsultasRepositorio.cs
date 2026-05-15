using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using PetLife.Repositorio.DTOs;
using PetLife.Repositorio.Interfaces;

namespace PetLife.Repositorio
{
    public class ConsultasRepositorio : BaseRepositorio, IConsultasRepositorio
    {
        public ConsultasRepositorio(PetLifeContexto contexto)
            : base(contexto) { }

        public async Task RegistrarConsultaAsync(Consultas consulta)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new
            {
                consulta.DataConsulta,
                consulta.Diagnostico,
                consulta.Motivo,
                consulta.Veterinario,
                consulta.PetId,
            };
            await connection.ExecuteAsync(
                "SP_RegistrarConsulta",
                parametros,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<HistoricoConsultaDTO>> BuscarConsultasPorPetAsync(
            string nomePet
        )
        {
            var connection = _contexto.Database.GetDbConnection();

            return await connection.QueryAsync<HistoricoConsultaDTO>(
                sql: "SELECT * FROM vwHistoricoConsultas WHERE NomePet = @NomePet ORDER BY DataConsulta DESC",
                param: new { NomePet = nomePet }
            );
        }

        public async Task AtualizarConsultaAsync(Consultas consulta)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new
            {
                consulta.Id,
                consulta.PetId,
                consulta.Veterinario,
                consulta.Diagnostico,
                consulta.Motivo,
                consulta.DataConsulta,
            };

            await connection.ExecuteAsync(
                sql: "SP_AtualizarConsulta",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
