using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PetLife.Api.Models.Vacinas;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using System.Linq;
using System.Threading.Tasks;

namespace PetLife.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VacinasController : ControllerBase
    {
        private readonly IVacinasAplicacao _vacinasAplicacao;

        public VacinasController(IVacinasAplicacao vacinasAplicacao)
        {
            _vacinasAplicacao = vacinasAplicacao;
        }

        [HttpPost]
        [Route("RegistrarVacina")]
        public async Task<IActionResult> RegistrarVacina([FromBody] VacinaRequest request)
        {
            if (request == null)
                return BadRequest("Dados inválidos.");

            var vacina = new PetLife.Dominio.Entidades.Vacinas
            {
                Nome = request.Nome,
                Fabricante = request.Fabricante,
                DataAplicacao = request.DataAplicacao,
                PetId = request.PetId
            };

            await _vacinasAplicacao.RegistrarVacinaAsync(vacina);
            return Ok("Vacina registrada com sucesso.");
        }

        [HttpGet]
        [Route("BuscarVacinasPorPet/{petId}")]
        public async Task<IActionResult> BuscarVacinasPorPet(int petId)
        {
            var vacinas = await _vacinasAplicacao.BuscarVacinasPorPetAsync(petId);
            var response = vacinas.Select(v => new VacinaResponse
            {
                Id = v.VacinaId,
                PetId = v.PetId,
                NomePet = v.NomePet,
                NomeVacina = v.NomeVacina,
                DataAplicacao = v.DataAplicacao,
                Fabricante = v.Fabricante
            });
            return Ok(response);
        }

        [HttpPut]
        [Route("AtualizarVacina")]
        public async Task<IActionResult> AtualizarVacina([FromBody] VacinaRequest request)
        {
            if (request == null || !request.Id.HasValue)
                return BadRequest("Dados inválidos ou ID não informado.");

            var vacina = new PetLife.Dominio.Entidades.Vacinas
            {
                Id = request.Id.Value,
                Nome = request.Nome,
                Fabricante = request.Fabricante,
                DataAplicacao = request.DataAplicacao
            };

            await _vacinasAplicacao.AtualizarVacinaAsync(vacina);
            return Ok("Vacina atualizada com sucesso.");
        }
    }
}
