public abstract class BaseRepositorio
{
    protected readonly PetLifeContexto _contexto;
    public BaseRepositorio(PetLifeContexto contexto) => _contexto = contexto;
}