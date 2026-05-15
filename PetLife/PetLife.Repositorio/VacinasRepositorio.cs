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
    public class VacinasRepositorio : BaseRepositorio, IVacinasRepositorio
    {
        public VacinasRepositorio(PetLifeContexto contexto)
            : base(contexto) { }

        public async Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId)
        {
            var connection = _contexto.Database.GetDbConnection();

            return await connection.QueryAsync<PetComVacinasDTO>(
                sql: "SELECT * FROM vwPetsComVacinas WHERE PetId = @PetId",
                param: new { PetId = petId }
            );
        }

        public async Task RegistrarVacinaAsync(Vacinas vacina)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new
            {
                vacina.PetId,
                vacina.Nome,
                vacina.Fabricante,
                vacina.DataAplicacao,
            };

            await connection.ExecuteAsync(
                sql: "SP_RegistrarVacina",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task AtualizarVacinaAsync(Vacinas vacina)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new
            {
                vacina.Id,
                vacina.Nome,
                vacina.Fabricante,
                vacina.DataAplicacao
            };

            await connection.ExecuteAsync(
                sql: "SP_AtualizarVacina",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
