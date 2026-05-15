using PetLife.Dominio.Entidades;

namespace PetLife.Aplicacao.Interfaces
{
    public interface ITokenAplicacao
    {
        string GerarToken(Usuarios usuario, string jwtKey);
    }
}
