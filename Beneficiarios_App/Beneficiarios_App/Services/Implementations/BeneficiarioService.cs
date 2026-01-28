using Beneficiarios_App.Data;
using Beneficiarios_App.DTOs;
using Beneficiarios_App.Exceptions;
using Beneficiarios_App.Services.Interfaces;
using Dapper;

namespace Beneficiarios_App.Services.Implementations
{
    public class BeneficiarioService : IBeneficiarioService
    {
        private readonly DapperContext _context;

        public BeneficiarioService(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BeneficiarioDto>> GetAllAsync()
        {
            using var connection = _context.CreateConnection();
            var beneficiarios = await connection.QueryAsync<BeneficiarioDto, DocumentoIdentidadDto, BeneficiarioDto>(
                "sp_ListarBeneficiarios",
                (ben, doc) =>
                {
                    ben.DocumentoIdentidad = doc;
                    return ben;
                },
                commandType: System.Data.CommandType.StoredProcedure,
                splitOn: "Id"
            );

            return beneficiarios;
        }

        public async Task<BeneficiarioDto> GetByIdAsync(int id)
        {
            const string query = @"
                SELECT 
                    b.Id,
                    b.Nombres,
                    b.Apellidos,
                    b.DocumentoIdentidadId,
                    b.NumeroDocumento,
                    b.FechaNacimiento,
                    b.Sexo,
                    di.Id,
                    di.Nombre,
                    di.Abreviatura,
                    di.Pais,
                    di.Longitud,
                    di.SoloNumeros
                FROM Beneficiario b
                LEFT JOIN DocumentoIdentidad di ON b.DocumentoIdentidadId = di.Id
                WHERE b.Id = @Id";

            using var connection = _context.CreateConnection();
            var beneficiario = await connection.QueryAsync<BeneficiarioDto, DocumentoIdentidadDto, BeneficiarioDto>(
                query,
                (ben, doc) =>
                {
                    ben.DocumentoIdentidad = doc;
                    return ben;
                },
                new { Id = id },
                splitOn: "Id"
            );

            return beneficiario.FirstOrDefault() ?? new BeneficiarioDto();
        }

        public async Task<int> CreateAsync(BeneficiarioCreateDto dto)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@Nombres", dto.Nombres);
            parameters.Add("@Apellidos", dto.Apellidos);
            parameters.Add("@DocumentoIdentidadId", dto.DocumentoIdentidadId);
            parameters.Add("@NumeroDocumento", dto.NumeroDocumento);
            parameters.Add("@FechaNacimiento", dto.FechaNacimiento);
            parameters.Add("@Sexo", dto.Sexo);

            await connection.ExecuteAsync(
                "sp_InsertarBeneficiario",
                parameters,
                commandType: System.Data.CommandType.StoredProcedure
            );

            // Obtener el ID del beneficiario insertado
            var lastId = await connection.QuerySingleAsync<int>(
                "SELECT MAX(Id) FROM Beneficiario"
            );
            return lastId;
        }

        public async Task<bool> UpdateAsync(int id, BeneficiarioCreateDto dto)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@Id", id);
            parameters.Add("@Nombres", dto.Nombres);
            parameters.Add("@Apellidos", dto.Apellidos);
            parameters.Add("@DocumentoIdentidadId", dto.DocumentoIdentidadId);
            parameters.Add("@NumeroDocumento", dto.NumeroDocumento);
            parameters.Add("@FechaNacimiento", dto.FechaNacimiento);
            parameters.Add("@Sexo", dto.Sexo);

            var result = await connection.ExecuteAsync(
                "sp_ActualizarBeneficiario",
                parameters,
                commandType: System.Data.CommandType.StoredProcedure
            );

            return result > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@Id", id);

            var result = await connection.ExecuteAsync(
                "sp_EliminarBeneficiario",
                parameters,
                commandType: System.Data.CommandType.StoredProcedure
            );

            return result > 0;
        }
    }
}
