using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PetLife.Api.Models.Usuarios;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using System.Threading.Tasks;

namespace PetLife.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioAplicacao _usuarioAplicacao;
        private readonly IConfiguration _configuration;

        public UsuariosController(IUsuarioAplicacao usuarioAplicacao, IConfiguration configuration)
        {
            _usuarioAplicacao = usuarioAplicacao;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("CadastrarUsuario")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] UsuarioRequest request)
        {
            if (request == null)
                return BadRequest("Dados inválidos.");

            var usuario = new Usuarios
            {
                Nome = request.Nome,
                Email = request.Email,
                Senha = request.Senha,
                Tipo = request.Tipo
            };

            await _usuarioAplicacao.CadastrarUsuarioAsync(usuario);
            return Ok("Usuário cadastrado com sucesso.");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Senha))
                return BadRequest("Dados inválidos.");

            var jwtKey = _configuration.GetValue<string>("Jwt:Key") ?? "AChaveSecretaMuitoForteParaPetLifeApiJWT123!";
            var token = await _usuarioAplicacao.LoginAsync(request.Email, request.Senha, jwtKey);

            if (token == null)
                return Unauthorized("E-mail ou senha incorretos.");

            return Ok(new LoginResponse { Token = token });
        }
    }
}
