# Sistema de Gestión de Beneficiarios

API REST para la gestión completa de beneficiarios y sus documentos de identidad.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Manejo de Errores](#manejo-de-errores)
- [Cambios Recientes](#cambios-recientes)
- [Contribución](#contribución)

## ✨ Características

- ✅ Gestión completa de beneficiarios (CRUD)
- ✅ Gestión de tipos de documentos de identidad
- ✅ Relaciones entre beneficiarios y documentos
- ✅ Manejo robusto de errores con códigos HTTP apropiados
- ✅ Respuestas API estructuradas y consistentes
- ✅ Stored Procedures optimizados
- ✅ CORS habilitado para integración con frontend
- ✅ Documentación con Swagger/OpenAPI

## 🔧 Requisitos Previos

- **.NET 8.0** o superior
- **SQL Server** 2019 o superior
- **Visual Studio 2022** o VS Code
- **PowerShell 5.1+** (para Windows)

## 📦 Instalación

### 1. Clonar o descargar el repositorio

```bash
cd "c:\Users\juans\OneDrive\Desktop\Sistema de Gestión de Beneficiarios\Beneficiarios_App"
```

### 2. Restaurar dependencias

```bash
dotnet restore
```

### 3. Compilar el proyecto

```bash
dotnet build
```

### 4. Crear la base de datos

Ejecuta el script SQL de inicialización en tu SQL Server:

```sql
-- Script: Scripts/sp_ListarBeneficiarios.sql
-- Crear tablas y stored procedures
```

### 5. Configurar la cadena de conexión

Edita `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=TU_SERVIDOR;Database=db_beneficiarios;Trusted_Connection=true;Encrypt=false;"
  }
}
```

### 6. Ejecutar la aplicación

```bash
dotnet run
```

La API estará disponible en: `https://localhost:7246`

## ⚙️ Configuración

### appsettings.Development.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=db_beneficiarios;Trusted_Connection=true;Encrypt=false;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### Variaciones por Entorno

- **Development:** `appsettings.Development.json`
- **Production:** `appsettings.json`

## 🚀 Uso

### Inicia la Aplicación

```bash
# Desarrollo con recarga automática
dotnet watch run

# O simplemente
dotnet run
```

### Accede a Swagger

Abre en tu navegador: `https://localhost:7246/swagger`

Aquí puedes probar todos los endpoints de forma interactiva.

## 📁 Estructura del Proyecto

```
Beneficiarios_App/
├── Controllers/                 # Controladores HTTP
│   ├── BeneficiariosController.cs
│   └── DocumentosIdentidadController.cs
├── Services/                    # Lógica de negocio
│   ├── Implementations/
│   │   ├── BeneficiarioService.cs
│   │   └── DocumentoIdentidadService.cs
│   └── Interfaces/
│       ├── IBeneficiarioService.cs
│       └── IDocumentoIdentidadService.cs
├── Models/                      # Modelos de datos
│   ├── Beneficiario.cs
│   └── DocumentoIdentidad.cs
├── DTOs/                        # Objetos de transferencia de datos
│   ├── BeneficiarioDto.cs
│   ├── BeneficiarioCreateDto.cs
│   ├── DocumentoIdentidadDto.cs
│   └── ApiResponse.cs           # Respuesta estándar
├── Exceptions/                  # Excepciones personalizadas
│   ├── NotFoundException.cs
│   └── ValidationException.cs
├── Data/                        # Acceso a datos
│   ├── ApplicationDbContext.cs
│   └── DapperContext.cs
├── Scripts/                     # Scripts SQL
│   └── sp_ListarBeneficiarios.sql
├── Properties/                  # Configuración del proyecto
│   └── launchSettings.json
├── Program.cs                   # Configuración principal
├── appsettings.json             # Config producción
├── appsettings.Development.json # Config desarrollo
└── Beneficiarios_App.csproj     # Archivo del proyecto
```

## 🔌 API Endpoints

### Beneficiarios

#### Obtener todos los beneficiarios
```http
GET /api/beneficiarios
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombres": "Juan",
      "apellidos": "Pérez",
      "numeroDocumento": "12345678",
      "fechaNacimiento": "1990-01-15",
      "sexo": "M",
      "documentoIdentidad": {
        "id": 1,
        "nombre": "Cédula",
        "abreviatura": "C",
        "pais": "Colombia"
      }
    }
  ],
  "message": "Beneficiarios obtenidos correctamente",
  "errors": null
}
```

#### Obtener beneficiario por ID
```http
GET /api/beneficiarios/{id}
```

**Parámetros:**
- `id` (int) - ID del beneficiario

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    "numeroDocumento": "12345678",
    "documentoIdentidad": { ... }
  },
  "message": "Beneficiario obtenido correctamente",
  "errors": null
}
```

**Errores:**
- `404 Not Found` - Si el beneficiario no existe

#### Crear beneficiario
```http
POST /api/beneficiarios
Content-Type: application/json

{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "documentoIdentidadId": 1,
  "numeroDocumento": "12345678",
  "fechaNacimiento": "1990-01-15",
  "sexo": "M"
}
```

**Respuesta (201 Created):**
```json
{
  "success": true,
  "data": 1,
  "message": "Beneficiario creado correctamente",
  "errors": null
}
```

**Errores:**
- `400 Bad Request` - Datos inválidos
- `500 Internal Server Error` - Error en el servidor

#### Actualizar beneficiario
```http
PUT /api/beneficiarios/{id}
Content-Type: application/json

{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "documentoIdentidadId": 1,
  "numeroDocumento": "12345678",
  "fechaNacimiento": "1990-01-15",
  "sexo": "M"
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": null,
  "message": "Beneficiario actualizado correctamente",
  "errors": null
}
```

**Errores:**
- `400 Bad Request` - Datos inválidos
- `404 Not Found` - Beneficiario no encontrado

#### Eliminar beneficiario
```http
DELETE /api/beneficiarios/{id}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": null,
  "message": "Beneficiario eliminado correctamente",
  "errors": null
}
```

**Errores:**
- `404 Not Found` - Beneficiario no encontrado

### Documentos de Identidad

#### Obtener documentos activos
```http
GET /api/documentosidentidad/activos
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Cédula",
      "abreviatura": "C",
      "pais": "Colombia",
      "longitud": 10,
      "soloNumeros": true
    }
  ],
  "message": "Documentos obtenidos correctamente",
  "errors": null
}
```

#### Obtener documento por ID
```http
GET /api/documentosidentidad/{id}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Cédula",
    "abreviatura": "C",
    "pais": "Colombia",
    "longitud": 10,
    "soloNumeros": true
  },
  "message": "Documento obtenido correctamente",
  "errors": null
}
```

## ⚠️ Manejo de Errores

La API retorna respuestas estructuradas con códigos HTTP apropiados:

### Códigos de Éxito

- **200 OK** - Solicitud exitosa
- **201 Created** - Recurso creado exitosamente

### Códigos de Error

- **400 Bad Request** - Datos de entrada inválidos
  ```json
  {
    "success": false,
    "data": null,
    "message": "Datos de entrada inválidos",
    "errors": null
  }
  ```

- **404 Not Found** - Recurso no encontrado
  ```json
  {
    "success": false,
    "data": null,
    "message": "Beneficiario no encontrado",
    "errors": null
  }
  ```

- **500 Internal Server Error** - Error en el servidor
  ```json
  {
    "success": false,
    "data": null,
    "message": "Error interno del servidor",
    "errors": ["Detalles en desarrollo"]
  }
  ```

## 📝 Cambios Recientes (28 de Enero de 2026)

### ✨ Nuevas Funcionalidades

1. **Respuestas API Estructuradas**
   - Creada clase `ApiResponse<T>` para estandarizar respuestas
   - Todas las respuestas incluyen: `success`, `data`, `message`, `errors`

2. **Excepciones Personalizadas**
   - `NotFoundException` (404)
   - `ValidationException` (400)

3. **Middleware Global de Manejo de Errores**
   - Captura automáticamente todas las excepciones
   - Retorna códigos HTTP apropiados
   - Oculta detalles sensibles en producción

4. **Mejora en Stored Procedures**
   - `sp_ListarBeneficiarios` ahora incluye relación con DocumentoIdentidad
   - Datos completos del tipo de documento en cada respuesta

5. **Controllers Simplificados**
   - Eliminados try-catch repetidos
   - Código más limpio y mantenible
   - Uso de excepciones para control de flujo

### 🔧 Cambios Técnicos

- Actualizado `BeneficiariosController.cs` con nuevo patrón de respuestas
- Actualizado `DocumentosIdentidadController.cs` con nuevo patrón
- Configurado middleware en `Program.cs`
- Agregadas importaciones de excepciones en Services

## 📚 Documentación para Frontend

Consulta el archivo `FRONTEND_UPDATE_GUIDE.txt` para:
- Estructura de respuestas detallada
- Ejemplos de código para Angular, React y Vue
- Manejo de errores en el frontend
- Checklist de implementación

## 🧹 Limpieza del Proyecto

Para reducir el tamaño del repositorio, puedes eliminar:

```bash
# Archivos compilados (se regeneran automáticamente)
Remove-Item -Recurse -Force bin/
Remove-Item -Recurse -Force obj/

# Caché de Visual Studio (se regenera automáticamente)
Remove-Item -Recurse -Force .vs/

# Archivo de configuración local
Remove-Item Beneficiarios_App.csproj.user
```

Se recomienda agregar estas carpetas a `.gitignore`:
```
bin/
obj/
.vs/
*.user
.vscode/
appsettings.Development.json
```

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea una rama para tu feature: `git checkout -b feature/NuevaFuncionalidad`
2. Realiza tus cambios
3. Commit: `git commit -m "Agregar nueva funcionalidad"`
4. Push: `git push origin feature/NuevaFuncionalidad`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 📧 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Última actualización:** 28 de enero de 2026  
**Versión:** 2.0.0  
**.NET Version:** 8.0  
**SQL Server:** 2019+
