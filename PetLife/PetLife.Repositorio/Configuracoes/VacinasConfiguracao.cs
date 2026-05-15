using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Configuracoes
{
    public class VacinasConfiguracao : IEntityTypeConfiguration<Vacinas>
    {
        public void Configure(EntityTypeBuilder<Vacinas> builder)
        {
            builder.ToTable("Vacinas").HasKey(v => v.Id);
            builder.Property(nameof(Vacinas.Id)).HasColumnName("Id");
            builder.Property(nameof(Vacinas.Nome)).HasColumnName("Nome").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Vacinas.Fabricante)).HasColumnName("Fabricante").IsRequired(false).HasMaxLength(100);
            builder.Property(nameof(Vacinas.DataAplicacao)).HasColumnName("DataAplicacao").IsRequired(true);
            builder.Property(nameof(Vacinas.PetId)).HasColumnName("PetId").IsRequired(true);

        }
    }
}