using Beneficiarios_App.DTOs;
using Beneficiarios_App.Exceptions;
using Beneficiarios_App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Beneficiarios_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiariosController : ControllerBase
    {
        private readonly IBeneficiarioService _service;

        public BeneficiariosController(IBeneficiarioService service)
        {
            _service = service;
        }

        /// <summary>
        /// Obtiene la lista de todos los beneficiarios
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<BeneficiarioDto>>>> GetAll()
        {
            var beneficiarios = await _service.GetAllAsync();
            return Ok(new ApiResponse<IEnumerable<BeneficiarioDto>>
            {
                Success = true,
                Data = beneficiarios,
                Message = "Beneficiarios obtenidos correctamente"
            });
        }

        /// <summary>
        /// Obtiene un beneficiario por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<BeneficiarioDto>>> GetById(int id)
        {
            var beneficiario = await _service.GetByIdAsync(id);
            if (beneficiario?.Id == 0)
                throw new NotFoundException("Beneficiario no encontrado");

            return Ok(new ApiResponse<BeneficiarioDto>
            {
                Success = true,
                Data = beneficiario,
                Message = "Beneficiario obtenido correctamente"
            });
        }

        /// <summary>
        /// Crea un nuevo beneficiario
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Create([FromBody] BeneficiarioCreateDto dto)
        {
            if (!ModelState.IsValid)
                throw new ValidationException("Datos de entrada inválidos");

            var id = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, new ApiResponse<int>
            {
                Success = true,
                Data = id,
                Message = "Beneficiario creado correctamente"
            });
        }

        /// <summary>
        /// Actualiza un beneficiario existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Update(int id, [FromBody] BeneficiarioCreateDto dto)
        {
            if (!ModelState.IsValid)
                throw new ValidationException("Datos de entrada inválidos");

            var result = await _service.UpdateAsync(id, dto);
            if (!result)
                throw new NotFoundException("Beneficiario no encontrado");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Beneficiario actualizado correctamente"
            });
        }

        /// <summary>
        /// Elimina un beneficiario
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            if (!result)
                throw new NotFoundException("Beneficiario no encontrado");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Beneficiario eliminado correctamente"
            });
        }
    }
}
