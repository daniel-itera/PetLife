using PetLife.Aplicacao;
using PetLife.Aplicacao.Interfaces;
using PetLife.Repositorio;
using PetLife.Repositorio.Interfaces;
using PetLife.Servico.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddMemoryCache(); // Adicionado para cache na IA

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the Database Context
builder.Services.AddDbContext<PetLifeContexto>();

// Configure Repositories Dependency Injection
builder.Services.AddScoped<IAlimentacaoRepositorio, AlimentacaoRepositorio>();
builder.Services.AddScoped<IConsultasRepositorio, ConsultasRepositorio>();
builder.Services.AddScoped<IPetsRepositorio, PetsRepositorio>();
builder.Services.AddScoped<IUsuarioRepositorio, UsuariosRepositorio>();
builder.Services.AddScoped<IVacinasRepositorio, VacinasRepositorio>();

// Configure Application Layer Dependency Injection
builder.Services.AddScoped<IAlimentacaoAplicacao, AlimentacaoAplicacao>();
builder.Services.AddScoped<IConsultasAplicacao, ConsultasAplicacao>();
builder.Services.AddScoped<IPetsAplicacao, PetsAplicacao>();
builder.Services.AddScoped<IUsuarioAplicacao, UsuariosAplicacao>();
builder.Services.AddScoped<IVacinasAplicacao, VacinasAplicacao>();
builder.Services.AddScoped<ITokenAplicacao, TokenAplicacao>();
builder.Services.AddScoped<IAiService, AiService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var key = Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("Jwt:Key") ?? "AChaveSecretaMuitoForteParaPetLifeApiJWT123!");
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
