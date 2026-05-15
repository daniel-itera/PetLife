using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using PetLife.Servico.Interfaces;

public class AiService : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly IMemoryCache _cache;

    public AiService(IConfiguration config, IMemoryCache cache)
    {
        _httpClient = new HttpClient();
        _config = config;
        _cache = cache;
    }

    public async Task<string> GetAiResponseAsync(string prompt, string petContext = "")
    {
        // Tenta buscar no Cache primeiro 
        string cacheKey = $"ai_resp_{prompt.GetHashCode()}_{petContext.GetHashCode()}";
        if (_cache.TryGetValue(cacheKey, out string cachedResponse))
        {
            return cachedResponse;
        }

        var url = _config["GitHubModels:ApiUrl"];
        var token = _config["GitHubModels:Token"];
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("PetLifeApp");

        var systemPrompt = @"Você é um assistente virtual do PetLife, um sistema de gestão para pets. 
Suas respostas devem ser estritamente relacionadas a animais de estimação, cuidados veterinários, ou ao sistema PetLife. 
Se a pergunta for sobre outro assunto, informe educadamente que você só responde sobre assuntos do universo pet.

IMPORTANTE: Você tem acesso ao histórico real dos pets do usuário. Use esses dados para dar recomendações personalizadas.
Responda de forma clara, amigável e objetiva em português brasileiro.";

        if (!string.IsNullOrWhiteSpace(petContext))
        {
            systemPrompt += "\n\n--- DADOS DOS PETS DO USUÁRIO ---\n" + petContext;
        }

        var payload = new 
        {
            model = "gpt-4o-mini", 
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = prompt }
            },
            max_tokens = 500
        };

        try 
        {
            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                return "Dica do PetLife: Lembre-se de manter as vacinas e vermifugação do seu pet em dia! O cuidado preventivo é o melhor caminho para uma vida longa e feliz. (A IA está descansando um pouco, mas logo volta!)";
            }

            var result = await response.Content.ReadAsStringAsync();
            using JsonDocument doc = JsonDocument.Parse(result);
            var textContent = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

            // Salva no cache por 1 hora 
            _cache.Set(cacheKey, textContent, TimeSpan.FromHours(1));

            return textContent;
        }
        catch
        {
            return "Ops! Tive um probleminha para pensar agora. Mas não esqueça de dar muito carinho ao seu pet hoje!";
        }
    }
}
