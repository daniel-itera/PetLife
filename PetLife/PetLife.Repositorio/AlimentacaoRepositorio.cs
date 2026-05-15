using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using PetLife.Repositorio.Interfaces;
using System.Data;

namespace PetLife.Repositorio
{
    public class AlimentacaoRepositorio : BaseRepositorio, IAlimentacaoRepositorio
    {
        public AlimentacaoRepositorio(PetLifeContexto contexto) : base(contexto)
        {
        }
        public async Task RegistrarAlimentacaoAsync(Alimentacao alimentacao)
        {
            var connection = _contexto.Database.GetDbConnection();
            
            var horariosStr = alimentacao.Horarios != null
                ? string.Join(",", alimentacao.Horarios.Select(h => h.ToString(@"hh\:mm")))
                : "";

            var parametros = new
            {
                alimentacao.PetId,
                alimentacao.TipoAlimento,
                alimentacao.Quantidade,
                Horarios = horariosStr
            };
            await connection.ExecuteAsync(
                sql: "SP_RegistrarAlimentacao",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Alimentacao>> BuscarAlimentacaoPorPetAsync(int petId)
        {
            var connection = _contexto.Database.GetDbConnection();
            
            var result = await connection.QueryAsync<dynamic>(
                sql: "SELECT * FROM VW_AlimentacaoDetalhada WHERE PetId = @PetId",
                param: new { PetId = petId }
            );

            return result.Select(r => new Alimentacao
            {
                Id = r.Id,
                TipoAlimento = r.TipoAlimento,
                Quantidade = r.Quantidade,
                PetId = r.PetId,
                Horarios = ParseHorarios(r.Horarios)
            });
        }

        private List<TimeSpan> ParseHorarios(string horarios)
        {
            if (string.IsNullOrEmpty(horarios)) return new List<TimeSpan>();
            return horarios.Split(',')
                           .Select(h => TimeSpan.Parse(h.Trim()))
                           .ToList();
        }

        public async Task AtualizarAlimentacaoAsync(Alimentacao alimentacao)
        {
            var connection = _contexto.Database.GetDbConnection();

            var horariosStr = alimentacao.Horarios != null
                ? string.Join(",", alimentacao.Horarios.Select(h => h.ToString(@"hh\:mm")))
                : "";

            var parametros = new
            {
                alimentacao.Id,
                alimentacao.TipoAlimento,
                alimentacao.Quantidade,
                Horarios = horariosStr
            };

            await connection.ExecuteAsync(
                sql: "SP_AtualizarAlimentacao",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}