using Beneficiarios_App.Data;
using Beneficiarios_App.DTOs;
using Beneficiarios_App.Exceptions;
using Beneficiarios_App.Services.Interfaces;
using Dapper;

namespace Beneficiarios_App.Services.Implementations
{
    public class DocumentoIdentidadService : IDocumentoIdentidadService
    {
        private readonly DapperContext _context;

        public DocumentoIdentidadService(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DocumentoIdentidadDto>> GetActivosAsync()
        {
            using var connection = _context.CreateConnection();
            var documentos = await connection.QueryAsync<DocumentoIdentidadDto>(
                "sp_ListarDocumentosIdentidadActivos",
                commandType: System.Data.CommandType.StoredProcedure
            );
            return documentos;
        }

        public async Task<DocumentoIdentidadDto> GetByIdAsync(int id)
        {
            const string query = @"
                SELECT Id, Nombre, Abreviatura, Pais, Longitud, SoloNumeros
                FROM DocumentoIdentidad
                WHERE Id = @Id";

            using var connection = _context.CreateConnection();
            var documento = await connection.QueryFirstOrDefaultAsync<DocumentoIdentidadDto>(
                query, 
                new { Id = id }
            );
            return documento ?? new DocumentoIdentidadDto();
        }
    }
}
