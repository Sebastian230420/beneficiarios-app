using Beneficiarios_App.DTOs;
using Beneficiarios_App.Exceptions;
using Beneficiarios_App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Beneficiarios_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentosIdentidadController : ControllerBase
    {
        private readonly IDocumentoIdentidadService _service;

        public DocumentosIdentidadController(IDocumentoIdentidadService service)
        {
            _service = service;
        }

        /// <summary>
        /// Obtiene la lista de documentos de identidad activos
        /// </summary>
        [HttpGet("activos")]
        public async Task<ActionResult<ApiResponse<IEnumerable<DocumentoIdentidadDto>>>> GetActivos()
        {
            var documentos = await _service.GetActivosAsync();
            return Ok(new ApiResponse<IEnumerable<DocumentoIdentidadDto>>
            {
                Success = true,
                Data = documentos,
                Message = "Documentos obtenidos correctamente"
            });
        }

        /// <summary>
        /// Obtiene un documento de identidad por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<DocumentoIdentidadDto>>> GetById(int id)
        {
            var documento = await _service.GetByIdAsync(id);
            if (documento?.Id == 0)
                throw new NotFoundException("Documento no encontrado");

            return Ok(new ApiResponse<DocumentoIdentidadDto>
            {
                Success = true,
                Data = documento,
                Message = "Documento obtenido correctamente"
            });
        }
    }
}
