using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PetLife.Api.Models.Consultas;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using System.Linq;
using System.Threading.Tasks;

namespace PetLife.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ConsultasController : ControllerBase
    {
        private readonly IConsultasAplicacao _consultasAplicacao;

        public ConsultasController(IConsultasAplicacao consultasAplicacao)
        {
            _consultasAplicacao = consultasAplicacao;
        }

        [HttpPost]
        [Route("RegistrarConsulta")]
        public async Task<IActionResult> RegistrarConsulta([FromBody] ConsultaRequest request)
        {
            if (request == null)
                return BadRequest("Dados inválidos.");

            var consulta = new PetLife.Dominio.Entidades.Consultas
            {
                Veterinario = request.Veterinario,
                Diagnostico = request.Diagnostico,
                Motivo = request.Motivo,
                DataConsulta = request.DataConsulta,
                PetId = request.PetId
            };

            await _consultasAplicacao.RegistrarConsultaAsync(consulta);
            return Ok("Consulta registrada com sucesso.");
        }

        [HttpGet]
        [Route("BuscarConsultasPorPet/{nomePet}")]
        public async Task<IActionResult> BuscarConsultasPorPet(string nomePet)
        {
            var consultas = await _consultasAplicacao.BuscarConsultasPorPetAsync(nomePet);
            var response = consultas.Select(c => new ConsultaResponse
            {
                Id = c.Id,
                PetId = c.PetId,
                Veterinario = c.Veterinario,
                Diagnostico = c.Diagnostico,
                Motivo = c.Motivo,
                DataConsulta = c.DataConsulta,
                NomePet = c.NomePet
            });
            return Ok(response);
        }

        [HttpPut]
        [Route("AtualizarConsulta")]
        public async Task<IActionResult> AtualizarConsulta([FromBody] ConsultaRequest request)
        {
            if (request == null || !request.Id.HasValue)
                return BadRequest("Dados inválidos ou ID não informado.");

            var consulta = new PetLife.Dominio.Entidades.Consultas
            {
                Id = request.Id.Value,
                PetId = request.PetId,
                Veterinario = request.Veterinario,
                Diagnostico = request.Diagnostico,
                Motivo = request.Motivo,
                DataConsulta = request.DataConsulta
            };

            await _consultasAplicacao.AtualizarConsultaAsync(consulta);
            return Ok("Consulta atualizada com sucesso.");
        }
    }
}
