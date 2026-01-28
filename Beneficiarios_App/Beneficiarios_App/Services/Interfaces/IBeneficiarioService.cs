using Beneficiarios_App.DTOs;

namespace Beneficiarios_App.Services.Interfaces
{
    public interface IBeneficiarioService
    {
        Task<IEnumerable<BeneficiarioDto>> GetAllAsync();
        Task<BeneficiarioDto> GetByIdAsync(int id);
        Task<int> CreateAsync(BeneficiarioCreateDto dto);
        Task<bool> UpdateAsync(int id, BeneficiarioCreateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
