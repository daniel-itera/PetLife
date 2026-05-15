using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PetLife.Api.Models.Alimentacao;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using System.Linq;
using System.Threading.Tasks;

namespace PetLife.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AlimentacaoController : ControllerBase
    {
        private readonly IAlimentacaoAplicacao _alimentacaoAplicacao;

        public AlimentacaoController(IAlimentacaoAplicacao alimentacaoAplicacao)
        {
            _alimentacaoAplicacao = alimentacaoAplicacao;
        }

        [HttpPost]
        [Route("RegistrarAlimentacao")]
        public async Task<IActionResult> RegistrarAlimentacao([FromBody] AlimentacaoRequest request)
        {
            if (request == null)
                return BadRequest("Dados inválidos.");

            var alimentacao = new PetLife.Dominio.Entidades.Alimentacao
            {
                TipoAlimento = request.TipoAlimento,
                Quantidade = request.Quantidade,
                Horarios = request.Horarios,
                PetId = request.PetId
            };

            await _alimentacaoAplicacao.RegistrarAlimentacaoAsync(alimentacao);
            return Ok("Alimentação registrada com sucesso.");
        }

        [HttpGet]
        [Route("BuscarAlimentacaoPorPet/{petId}")]
        public async Task<IActionResult> BuscarAlimentacaoPorPet(int petId)
        {
            var usuarioIdClaim = User.FindFirst("Id")?.Value;
            if (string.IsNullOrEmpty(usuarioIdClaim) || !int.TryParse(usuarioIdClaim, out int usuarioId))
                return Unauthorized("Usuário não identificado.");
            
            var alimentacoes = await _alimentacaoAplicacao.BuscarAlimentacaoPorPetAsync(petId);
            var response = alimentacoes.Select(a => new AlimentacaoResponse
            {
                Id = a.Id,
                TipoAlimento = a.TipoAlimento,
                Quantidade = a.Quantidade,
                Horarios = a.Horarios?.Select(h => h.ToString(@"hh\:mm")).ToList() ?? new List<string>(),
                PetId = a.PetId
            });
            return Ok(response);
        }

        [HttpPut]
        [Route("AtualizarAlimentacao")]
        public async Task<IActionResult> AtualizarAlimentacao([FromBody] AlimentacaoRequest request)
        {
            if (request == null || !request.Id.HasValue)
                return BadRequest("Dados inválidos ou ID não informado.");

            var alimentacao = new PetLife.Dominio.Entidades.Alimentacao
            {
                Id = request.Id.Value,
                TipoAlimento = request.TipoAlimento,
                Quantidade = request.Quantidade,
                Horarios = request.Horarios
            };

            await _alimentacaoAplicacao.AtualizarAlimentacaoAsync(alimentacao);
            return Ok("Alimentação atualizada com sucesso.");
        }
    }
}
