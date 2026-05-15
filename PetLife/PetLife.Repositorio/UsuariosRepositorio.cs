using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using PetLife.Repositorio.Interfaces;
using System.Data;

namespace PetLife.Repositorio
{
    public class UsuariosRepositorio : BaseRepositorio, IUsuarioRepositorio
    {
        public UsuariosRepositorio(PetLifeContexto contexto): base(contexto) 
        { 

        }

        public async Task CadastrarUsuarioAsync(Usuarios usuario)
        {
            var connection = _contexto.Database.GetDbConnection();
            
            var parametros = new
            {
                usuario.Nome,
                usuario.Email,
                usuario.Senha,
                usuario.Tipo
            };

            await connection.ExecuteAsync(
                sql: "SP_CadastrarUsuario",
                param: parametros,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Usuarios?> LoginAsync(string email, string senha)
        {
            var connection = _contexto.Database.GetDbConnection();

            var query = "SELECT * FROM Usuarios WHERE Email = @Email AND Senha = @Senha AND Ativo = 1";
            var parametros = new { Email = email, Senha = senha };

            return await connection.QueryFirstOrDefaultAsync<Usuarios>(query, parametros);
        }
    }
}