using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PetLife.Api.Models.Pets;
using PetLife.Api.Models.Vacinas;
using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using System.Linq;
using System.Threading.Tasks;

namespace PetLife.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly IPetsAplicacao _petsAplicacao;

        public PetsController(IPetsAplicacao petsAplicacao)
        {
            _petsAplicacao = petsAplicacao;
        }

        [HttpPost]
        [Route("CadastrarPet")]
        public async Task<IActionResult> CadastrarPet([FromBody] PetRequest request)
        {
            var usuarioIdClaim = User.FindFirst("Id")?.Value;
            if (string.IsNullOrEmpty(usuarioIdClaim) || !int.TryParse(usuarioIdClaim, out int usuarioId))
                return Unauthorized("Usuário não identificado.");

            if (request == null)
                return BadRequest("Dados inválidos.");

            var pet = new Pets
            {
                Nome = request.Nome,
                Raca = request.Raca,
                Peso = request.Peso,
                Genero = request.Genero,
                Tipo = request.Tipo,
                DataNascimento = request.DataNascimento,
                UsuarioId = usuarioId
            };

            await _petsAplicacao.CadastrarPetAsync(pet);
            return Ok("Pet cadastrado com sucesso.");
        }

        [HttpGet]
        [Route("BuscarPetsAtivosPorTipo/{tipo}")]
        public async Task<IActionResult> BuscarPetsAtivosPorTipo(TipoPet tipo)
        {
            var pets = await _petsAplicacao.BuscarPetsAtivosPorTipoAsync(tipo);
            var response = pets.Select(p => new PetResponse
            {
                Id = p.Id,
                Nome = p.Nome,
                Raca = p.Raca,
                Peso = p.Peso,
                Genero = p.Genero,
                Tipo = p.Tipo,
                Ativo = p.Ativo,
                DataNascimento = p.DataNascimento,
                UsuarioId = p.UsuarioId
            });
            return Ok(response);
        }

        [HttpGet]
        [Route("BuscarPetsComDono")]
        public async Task<IActionResult> BuscarPetsComDono()
        {
            var usuarioIdClaim = User.FindFirst("Id")?.Value;
            if (string.IsNullOrEmpty(usuarioIdClaim) || !int.TryParse(usuarioIdClaim, out int usuarioId))
                return Unauthorized("Usuário não identificado.");

            var pets = await _petsAplicacao.BuscarPetsComDonoAsync(usuarioId);
            var response = pets.Select(p => new PetResponse
            {
                Id = p.Id,
                Nome = p.Nome,
                Raca = p.Raca,
                Peso = p.Peso,
                Genero = p.Genero,
                Tipo = p.Tipo,
                Ativo = p.Ativo,
                DataNascimento = p.DataNascimento,
                UsuarioId = p.UsuarioId
            });
            return Ok(response);
        }

        [HttpGet]
        [Route("BuscarPetPorId/{id}")]
        public async Task<IActionResult> BuscarPetPorId(int id)
        {
            var pet = await _petsAplicacao.BuscarPetPorIdAsync(id);
            if (pet == null)
                return NotFound("Pet não encontrado.");

            var response = new PetResponse
            {
                Id = pet.Id,
                Nome = pet.Nome,
                Raca = pet.Raca,
                Peso = pet.Peso,
                Genero = pet.Genero,
                Tipo = pet.Tipo,
                Ativo = pet.Ativo,
                DataNascimento = pet.DataNascimento,
                UsuarioId = pet.UsuarioId
            };

            return Ok(response);
        }

        [HttpPut]
        [Route("AtualizarPet/{id}")]
        public async Task<IActionResult> AtualizarPet(int id, [FromBody] PetRequest request)
        {
            var usuarioIdClaim = User.FindFirst("Id")?.Value;
            if (string.IsNullOrEmpty(usuarioIdClaim) || !int.TryParse(usuarioIdClaim, out int usuarioId))
                return Unauthorized("Usuário não identificado.");

            if (request == null)
                return BadRequest("Dados inválidos.");

            var pet = new Pets
            {
                Id = id,
                Nome = request.Nome,
                Raca = request.Raca,
                Peso = request.Peso,
                Genero = request.Genero,
                Tipo = request.Tipo,
                DataNascimento = request.DataNascimento,
                UsuarioId = usuarioId
            };

            await _petsAplicacao.AtualizarPetAsync(pet);
            return Ok("Pet atualizado com sucesso.");
        }

        [HttpDelete]
        [Route("InativarPet/{id}")]
        public async Task<IActionResult> InativarPet(int id)
        {
            await _petsAplicacao.InativarPetAsync(id);
            return Ok("Pet inativado com sucesso.");
        }

        [HttpGet]
        [Route("BuscarVacinasPorPet/{id}")]
        public async Task<IActionResult> BuscarVacinasPorPet(int id)
        {
            var vacinas = await _petsAplicacao.BuscarVacinasPorPetAsync(id);
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
    }
}
