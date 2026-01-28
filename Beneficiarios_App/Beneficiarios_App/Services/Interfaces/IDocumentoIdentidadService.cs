using Beneficiarios_App.DTOs;

namespace Beneficiarios_App.Services.Interfaces
{
    public interface IDocumentoIdentidadService
    {
        Task<IEnumerable<DocumentoIdentidadDto>> GetActivosAsync();
        Task<DocumentoIdentidadDto> GetByIdAsync(int id);
    }
}
