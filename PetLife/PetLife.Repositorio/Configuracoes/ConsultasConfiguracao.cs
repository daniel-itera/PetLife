using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Configuracoes
{
    public class ConsultasConfiguracao : IEntityTypeConfiguration<Consultas>
    {
        public void Configure(EntityTypeBuilder<Consultas> builder)
        {
            builder.ToTable("Consultas").HasKey(c => c.Id);
            builder.Property(nameof(Consultas.Id)).HasColumnName("Id");
            builder.Property(nameof(Consultas.Veterinario)).HasColumnName("Veterinario").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Consultas.Motivo)).HasColumnName("Motivo").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Consultas.Diagnostico)).HasColumnName("Diagnostico").IsRequired(true).HasMaxLength(200);
            builder.Property(nameof(Consultas.DataConsulta)).HasColumnName("DataConsulta").IsRequired(true);
            builder.Property(nameof(Consultas.PetId)).HasColumnName("PetId").IsRequired(true);
        }
    }
}