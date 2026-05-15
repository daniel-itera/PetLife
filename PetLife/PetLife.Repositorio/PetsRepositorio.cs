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
    public class PetsRepositorio : BaseRepositorio, IPetsRepositorio
    {
        public PetsRepositorio(PetLifeContexto contexto)
            : base(contexto) { }

        public async Task<IEnumerable<Pets>> BuscarPetsAtivosPorTipoAsync(TipoPet tipo)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new { Tipo = tipo };

            var pets = await connection.QueryAsync<Pets>(
                sql: "SP_BuscarPetsAtivosPorTipo",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );

            return pets.ToList();
        }

        public async Task CadastrarPetAsync(Pets pet)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new
            {
                pet.Nome,
                pet.Raca,
                pet.Peso,
                pet.Genero,
                pet.DataNascimento,
                pet.Tipo,
                pet.UsuarioId,
            };
            await connection.ExecuteAsync(
                "SP_CadastrarPet",
                parametros,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Pets>> BuscarPetsComDonoAsync(int usuarioId)
        {
            var connection = _contexto.Database.GetDbConnection();

            return await connection.QueryAsync<Pets>(
                sql: "SELECT * FROM vwPetsComDono WHERE UsuarioId = @UsuarioId AND Ativo = 1",
                param: new { UsuarioId = usuarioId }
            );
        }

        public async Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId)
        {
            var connection = _contexto.Database.GetDbConnection();

            return await connection.QueryAsync<PetComVacinasDTO>(
                sql: "SELECT * FROM vwPetsComVacinas WHERE PetId = @PetId",
                param: new { PetId = petId }
            );
        }

        public async Task InativarPetAsync(int petId)
        {
            var connection = _contexto.Database.GetDbConnection();

            var affectedRows = await connection.ExecuteAsync(
                sql: "UPDATE Pets SET Ativo = 0 WHERE Id = @PetId",
                param: new { PetId = petId }
            );

            if (affectedRows == 0)
                throw new System.Exception("Nenhum pet foi encontrado para inativar.");
        }

        public async Task<Pets?> BuscarPetPorIdAsync(int petId)
        {
            var connection = _contexto.Database.GetDbConnection();
            return await connection.QueryFirstOrDefaultAsync<Pets>(
                sql: "SP_BuscarPetPorId",
                param: new { PetId = petId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task AtualizarPetAsync(Pets pet)
        {
            var connection = _contexto.Database.GetDbConnection();

            var parametros = new
            {
                pet.Id,
                pet.Nome,
                pet.Raca,
                pet.Peso,
                pet.Genero,
                pet.DataNascimento,
                pet.Tipo,
            };

            await connection.ExecuteAsync(
                "SP_AtualizarPet",
                parametros,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
