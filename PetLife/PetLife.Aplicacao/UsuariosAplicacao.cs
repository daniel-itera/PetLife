using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using PetLife.Repositorio.Interfaces;

using System;
using System.Threading.Tasks;

namespace PetLife.Aplicacao
{
    public class UsuariosAplicacao : IUsuarioAplicacao
    {
        readonly IUsuarioRepositorio _usuarioRepositorio;
        readonly ITokenAplicacao _tokenAplicacao;

        public UsuariosAplicacao(IUsuarioRepositorio usuarioRepositorio, ITokenAplicacao tokenAplicacao)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _tokenAplicacao = tokenAplicacao;
        }

        public Task CadastrarUsuarioAsync(Usuarios usuario)
        {
            if (usuario == null)
            {
                throw new Exception("Usuario não pode ser nulo");
            }

            ValidaUsuario(usuario);

            return _usuarioRepositorio.CadastrarUsuarioAsync(usuario);
        }

        private static void ValidaUsuario(Usuarios usuario)
        {
            if (string.IsNullOrEmpty(usuario.Nome))
                throw new Exception("Nome não pode ser vazio");

            if (string.IsNullOrEmpty(usuario.Email))
                throw new Exception("Email não pode ser vazio");

            if (string.IsNullOrEmpty(usuario.Senha))
                throw new Exception("Senha não pode ser vazia");
        }

        public async Task<string?> LoginAsync(string email, string senha, string jwtKey)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(senha))
                throw new Exception("Email e senha não podem ser vazios.");

            var usuario = await _usuarioRepositorio.LoginAsync(email, senha);

            if (usuario == null)
                return null;

            return _tokenAplicacao.GerarToken(usuario, jwtKey);
        }
    }
}
