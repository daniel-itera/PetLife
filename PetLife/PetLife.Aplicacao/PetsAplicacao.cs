using PetLife.Aplicacao.Interfaces;
using PetLife.Dominio.Entidades;
using PetLife.Dominio.Enumeradores;
using PetLife.Repositorio.Interfaces;
using PetLife.Repositorio.DTOs;


namespace PetLife.Aplicacao
{
    public class PetsAplicacao : IPetsAplicacao
    {
        readonly IPetsRepositorio _petRepositorio;

        public PetsAplicacao(IPetsRepositorio petRepositorio)
        {
            _petRepositorio = petRepositorio;
        }

        public async Task CadastrarPetAsync(Pets pet)
        {
            if (pet == null)
                throw new ArgumentException("Pet inválido.");

            ValidarPet(pet);

            pet.Ativo = true;
            await _petRepositorio.CadastrarPetAsync(pet);
        }

        private static void ValidarPet(Pets pet)
        {
            if (string.IsNullOrWhiteSpace(pet.Nome))
                throw new ArgumentException("O nome do pet é obrigatório.");

            if (pet.DataNascimento > DateTime.Now)
                throw new ArgumentException("A data de nascimento não pode ser futura.");

            if (pet.Peso <= 0)
                throw new ArgumentException("O peso deve ser maior que zero.");
        }

        public async Task<IEnumerable<Pets>> BuscarPetsAtivosPorTipoAsync(TipoPet tipo)
        {
            return await _petRepositorio.BuscarPetsAtivosPorTipoAsync(tipo);
        }

        public async Task<IEnumerable<Pets>> BuscarPetsComDonoAsync(int usuarioId)
        {
            return await _petRepositorio.BuscarPetsComDonoAsync(usuarioId);
        }

        public async Task InativarPetAsync(int petId)
        {
            if (petId <= 0)
                throw new ArgumentException("ID do pet inválido.");

            await _petRepositorio.InativarPetAsync(petId);
        }

        public async Task<Pets?> BuscarPetPorIdAsync(int petId)
        {
            if (petId <= 0)
                throw new ArgumentException("ID do pet inválido.");

            return await _petRepositorio.BuscarPetPorIdAsync(petId);
        }

        public async Task<IEnumerable<PetComVacinasDTO>> BuscarVacinasPorPetAsync(int petId)
        {
            if (petId <= 0)
                throw new ArgumentException("ID do pet inválido.");

            var pet = await _petRepositorio.BuscarPetPorIdAsync(petId);
            if (pet == null)
                throw new Exception("Pet não encontrado.");

            return await _petRepositorio.BuscarVacinasPorPetAsync(petId);
        }

        public async Task AtualizarPetAsync(Pets pet)
        {
            if (pet == null)
                throw new ArgumentNullException(nameof(pet));

            if (pet.Id <= 0)
                throw new ArgumentException("ID do pet inválido.");

            ValidarPet(pet);

            await _petRepositorio.AtualizarPetAsync(pet);
        }
    }
}