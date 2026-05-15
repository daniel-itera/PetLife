using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetLife.Dominio.Entidades;

namespace PetLife.Repositorio.Configuracoes
{
    public class UsuariosConfiguracao : IEntityTypeConfiguration<Usuarios>
    {
        public void Configure(EntityTypeBuilder<Usuarios> builder)
        {
            builder.ToTable("Usuarios").HasKey(u => u.Id);
            builder.Property(nameof(Usuarios.Id)).HasColumnName("Id");
            builder.Property(nameof(Usuarios.Nome)).HasColumnName("Nome").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Usuarios.Email)).HasColumnName("Email").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Usuarios.Senha)).HasColumnName("Senha").IsRequired(true).HasMaxLength(100);
            builder.Property(nameof(Usuarios.Tipo)).HasColumnName("Tipo").IsRequired(true);
            builder.Property(nameof(Usuarios.Ativo)).HasColumnName("Ativo").IsRequired(true);
            builder.HasMany(u => u.Pets).WithOne(p => p.Usuario).HasForeignKey(p => p.UsuarioId);
        }
    }
}