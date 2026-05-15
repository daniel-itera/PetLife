using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Configuracoes
{
    public class AlimentacaoConfiguracao : IEntityTypeConfiguration<Alimentacao>
    {
        public void Configure(EntityTypeBuilder<Alimentacao> builder)
        {
            builder.ToTable("Alimentacao").HasKey(a => a.Id);
            builder.Property(nameof(Alimentacao.Id)).HasColumnName("Id");
            builder.Property(nameof(Alimentacao.TipoAlimento)).HasColumnName("TipoAlimento").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Alimentacao.Quantidade)).HasColumnName("Quantidade").IsRequired(true);
            builder.Property(nameof(Alimentacao.Horarios)).HasColumnName("Horarios").IsRequired(true);
            builder.Property(nameof(Alimentacao.PetId)).HasColumnName("PetId").IsRequired(true);
        }
    }
}