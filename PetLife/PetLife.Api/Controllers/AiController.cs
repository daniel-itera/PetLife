using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PetLife.Api.Models.Ai;
using PetLife.Servico.Interfaces;

namespace PetLife.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("IA")]
        public async Task<IActionResult> Completar([FromBody] AiRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Prompt))
                return BadRequest("Prompt não informado.");

            var resposta = await _aiService.GetAiResponseAsync(request.Prompt, request.PetContext ?? "");
            return Ok(resposta);
        }
    }
}
