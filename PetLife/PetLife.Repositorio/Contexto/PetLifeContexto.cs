using Microsoft.EntityFrameworkCore;
using PetLife.Dominio.Entidades;
using PetLife.Repositorio.Configuracoes;

public class PetLifeContexto : DbContext
{
     private readonly DbContextOptions _options;
     
     public DbSet<Pets> Pets { get; set; }
     public DbSet<Usuarios> Usuarios { get; set; }
     public DbSet<Consultas> Consultas { get; set; }
     public DbSet<Alimentacao> Alimentacao { get; set; }
     public DbSet<Vacinas> Vacinas { get; set; }

     public PetLifeContexto()
    {
        
    }
    public PetLifeContexto(DbContextOptions options) : base(options)
    {
        _options = options;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=.;Database=PetLife;Trusted_Connection=True;TrustServerCertificate=True;");
        } 
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PetsConfiguracao).Assembly);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AlimentacaoConfiguracao).Assembly);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(VacinasConfiguracao).Assembly);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UsuariosConfiguracao).Assembly);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ConsultasConfiguracao).Assembly);
    }
}