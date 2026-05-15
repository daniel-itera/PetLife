using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Configuracoes
{
    public class PetsConfiguracao : IEntityTypeConfiguration<Pets>
    {
        public void Configure(EntityTypeBuilder<Pets> builder)
        {
            builder.ToTable("Pets").HasKey(p => p.Id);
            builder.Property(nameof(Pets.Id)).HasColumnName("Id");
            builder.Property(nameof(Pets.Nome)).HasColumnName("Nome").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Pets.Raca)).HasColumnName("Raca").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Pets.Peso)).HasColumnName("Peso").IsRequired(true);
            builder.Property(nameof(Pets.Genero)).HasColumnName("Genero").IsRequired(true);
            builder.Property(nameof(Pets.Tipo)).HasColumnName("Tipo").IsRequired(true);
            builder.Property(nameof(Pets.Ativo)).HasColumnName("Ativo").IsRequired(true);
            builder.Property(nameof(Pets.DataNascimento)).HasColumnName("DataNascimento").IsRequired(true);
            builder.HasMany(p => p.Alimentacoes).WithOne(a => a.Pet).HasForeignKey(a => a.PetId);
            builder.HasMany(p => p.Vacinas).WithOne(v => v.Pet).HasForeignKey(v => v.PetId);
            builder.HasMany(p => p.Consultas).WithOne(c => c.Pet).HasForeignKey(c => c.PetId);
        }
    }
}