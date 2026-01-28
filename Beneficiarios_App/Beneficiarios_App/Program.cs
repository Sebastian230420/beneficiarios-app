using Beneficiarios_App.Data;
using Beneficiarios_App.DTOs;
using Beneficiarios_App.Exceptions;
using Beneficiarios_App.Services.Implementations;
using Beneficiarios_App.Services.Interfaces;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register DapperContext
builder.Services.AddScoped<DapperContext>();

// Register services
builder.Services.AddScoped<IDocumentoIdentidadService, DocumentoIdentidadService>();
builder.Services.AddScoped<IBeneficiarioService, BeneficiarioService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure Global Exception Handler Middleware
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        var exception = exceptionHandlerPathFeature?.Error;

        var response = new ApiResponse<object>
        {
            Success = false,
            Message = "Error procesando la solicitud"
        };

        if (exception != null)
        {
            // Log the exception (opcional, puedes agregar logging aquí)
            Console.WriteLine($"Exception: {exception.Message}");

            // Determinar el código de estado basado en el tipo de excepción
            if (exception is NotFoundException)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                response.Message = exception.Message;
            }
            else if (exception is ValidationException)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                response.Message = exception.Message;
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                response.Message = "Error interno del servidor";
                
                // Solo mostrar detalles en desarrollo
                if (app.Environment.IsDevelopment())
                {
                    response.Errors = new List<string> { exception.Message };
                }
            }
        }

        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(response);
    });
});

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
