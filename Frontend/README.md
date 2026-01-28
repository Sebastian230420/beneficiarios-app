# Beneficiarios Frontend

Frontend para el Sistema de Gestión de Beneficiarios desarrollado con React + TypeScript + Vite + Tailwind CSS

## Características

- ✨ Interfaz moderna y responsiva con Tailwind CSS
- 📱 Formulario validado con tipos de documento dinámicos
- 🔍 Búsqueda y filtrado avanzado** (nombre, tipo documento, sexo)
- 🎨 Diseño gradiente y animaciones suave
- 🔄 Integración completa con API REST estructurada
- ⚡ Carga rápida con Vite
- 🛡️ Manejo robusto de errores con mensajes claros
- 📊 Tabla interactiva con edición y eliminación de beneficiarios

## Requisitos previos

- Node.js 16+ instalado
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build

```bash
# Compilar para producción
npm run build

# Vista previa de la compilación
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx       # Barra de navegación
│   ├── BeneficiarioForm.tsx  # Formulario de creación/edición
│   ├── BeneficiarioFilters.tsx  # Panel de filtrados y búsqueda
│   └── BeneficiarioTable.tsx # Tabla de beneficiarios
├── services/            # Servicios de API
│   ├── api.ts           # Servicios CRUD para beneficiarios y documentos
│   └── httpClient.ts    # Cliente HTTP genérico con manejo de ApiResponse
├── types/               # Tipos TypeScript
│   └── api.ts           # Interfaces de Beneficiario, DocumentoIdentidad, etc.
├── App.tsx              # Componente principal con lógica de estado y filtros
├── App.css              # Estilos globales
├── index.css            # Importación de Tailwind CSS
└── main.tsx             # Punto de entrada
```

## Configuración de API

La aplicación está configurada para conectarse a la API en `https://localhost:7197/api`

Para cambiar la URL base, edita [src/services/httpClient.ts](src/services/httpClient.ts):

```typescript
const baseUrl = 'https://localhost:7197/api';
```

## Estructura de Respuestas API

La API retorna respuestas en el siguiente formato:

**Éxito (200, 201):**
```json
{
  "success": true,
  "data": { /* datos aquí */ },
  "message": "Acción completada",
  "errors": null
}
```

**Error (400, 404, 500):**
```json
{
  "success": false,
  "data": null,
  "message": "Descripción del error",
  "errors": null
}
```

El cliente HTTP ([httpClient.ts](src/services/httpClient.ts)) extrae automáticamente el campo `data` y maneja los errores correctamente.

## Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/beneficiarios` | Obtener lista de beneficiarios (incluye documentoIdentidad) |
| GET | `/beneficiarios/{id}` | Obtener un beneficiario específico |
| POST | `/beneficiarios` | Crear nuevo beneficiario |
| PUT | `/beneficiarios/{id}` | Actualizar beneficiario |
| DELETE | `/beneficiarios/{id}` | Eliminar beneficiario |
| GET | `/documentosidentidad/activos` | Obtener tipos de documento disponibles |

## Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.0",
  "tailwindcss": "^4.1.18",
  "@tailwindcss/postcss": "^4.1.18"
}
```

## Herramientas de Desarrollo

- **Vite**: Bundler rápido
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos utilitarios
- **PostCSS**: Procesamiento de CSS

## Notas Importantes

⚠️ **CORS**: Asegúrate de que el backend tenga CORS habilitado en su configuración.

⚠️ **HTTPS**: La API usa HTTPS en `localhost:7197`. En desarrollo, es posible que debas aceptar certificados auto-firmados.

⚠️ **Validación**: El formulario valida:
  - Tipos de documento según su longitud
  - Documentos que requieren solo números
  - Campos obligatorios
  - Formatos de fecha

## Troubleshooting

**Error: Cannot read property 'nombre' of undefined**
- Solución: Asegúrate de que el backend retorna el objeto `documentoIdentidad` completo

**Error: CORS Policy**
- Solución: Verifica que el backend tenga habilitado CORS para tu dominio

**Error: "Cannot apply unknown utility class"**
- Solución: Ejecuta `npm install` nuevamente para reinstalar dependencias de Tailwind

## Funcionalidades de Filtrado

### Búsqueda por Nombre
- Busca en tiempo real por nombre o apellido del beneficiario
- La búsqueda es case-insensitive (no distingue mayúsculas/minúsculas)
- Se filtra mientras escribes

### Filtro por Tipo de Documento
- Selecciona el tipo de documento específico
- Muestra dinámicamente los tipos disponibles desde la API
- Opción "Todos los documentos" para ver todos

### Filtro por Sexo
- Filtra beneficiarios por Masculino o Femenino
- Opción "Todos" para ver sin restricción

### Botón Limpiar Filtros
- Aparece cuando hay filtros activos
- Resetea todos los filtros a su estado inicial
- Utiliza un icono de recarga para indicar la acción

### Indicador de Resultados
- Muestra un resumen visual cuando hay filtros activos
- Indica cuántos beneficiarios se muestran vs. el total
- Ejemplo: "Beneficiarios (5 de 20)"

## Autor

**Sebastian Velasquez** - Desarrollador Junior  
📧 [juansivelasquez2004@gmail.com](mailto:juansivelasquez2004@gmail.com)  
📱 +51 928 536 274
