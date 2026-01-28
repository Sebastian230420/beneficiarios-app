# Sistema de Gestión de Beneficiarios

Aplicación web para la gestión de beneficiarios con base de datos SQL Server y una interfaz frontend moderna con React y TypeScript.

## Tabla de Contenidos

- [Instrucciones de Instalación](#instrucciones-de-instalación)
- [Instrucciones para Ejecutar el Proyecto](#instrucciones-para-ejecutar-el-proyecto)
- [Scripts de Base de Datos](#scripts-de-base-de-datos)

---

## Instrucciones de Instalación

### Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **SQL Server 2019** o superior
- **.NET 8 SDK** 
- **Node.js 16** o superior
- **npm** (viene con Node.js)
- **Git**

### 1. Configurar la Base de Datos

#### a. Crear la Base de Datos

1. Abre **SQL Server Management Studio (SSMS)**
2. Conecta con tu instancia de SQL Server
3. Abre un nuevo script de consulta
4. Ejecuta el contenido del archivo `db_Beneficiarios.sql`:
   ```sql
   -- El script creará la base de datos "Beneficiarios"
   ```

#### b. Crear los Stored Procedures

1. En SSMS, abre un nuevo script de consulta
2. Conecta a la base de datos `Beneficiarios` (selecciona en el dropdown)
3. Ejecuta el contenido del archivo `sp_Beneficiarios.sql`:
   ```sql
   -- El script creará todos los stored procedures necesarios
   ```

#### c. Insertar Datos de Prueba

1. En SSMS, abre un nuevo script de consulta
2. Asegúrate de estar en la base de datos `Beneficiarios`
3. Ejecuta el contenido del archivo `datos_Beneficiarios.sql`:
   ```sql
   -- El script insertará datos de prueba
   ```

#### d. Configurar Usuario de SQL Server (Opcional pero Recomendado)

Si deseas usar un usuario específico en lugar de autenticación de Windows:

1. En SSMS, expande **Security > Logins**
2. Haz clic derecho y selecciona **New Login**
3. Crea un nuevo usuario SQL (ejemplo: `beneficiarios_user`)
4. Asigna permisos a la base de datos `Beneficiarios`
5. Copia el usuario y contraseña para usarlos en la cadena de conexión

---

## Instrucciones para Ejecutar el Proyecto

### Backend (ASP.NET Core)

1. **Navega a la carpeta del backend:**
   ```bash
   cd Beneficiarios_App
   ```

2. **Restaura las dependencias de NuGet:**
   ```bash
   dotnet restore
   ```

3. **Configura la cadena de conexión en `appsettings.json`:**
   
   Abre el archivo `Beneficiarios_App/appsettings.json` y verifica/actualiza la cadena de conexión:
   
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=Beneficiarios;Trusted_Connection=true;Encrypt=false;"
     }
   }
   ```
   
   **Si usaste un usuario SQL personalizado:**
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=Beneficiarios;User Id=beneficiarios_user;Password=tu_contraseña;Encrypt=false;"
     }
   }
   ```

4. **Ejecuta el backend:**
   ```bash
   dotnet run
   ```
   
   El servidor ASP.NET Core estará disponible en: `https://localhost:7xxx` (verifica el puerto exacto en la consola)

### Frontend (React + TypeScript)

1. **Abre una nueva terminal y navega a la carpeta del frontend:**
   ```bash
   cd Frontend
   ```

2. **Instala las dependencias de npm:**
   ```bash
   npm install
   ```
   
   Esto descargará e instalará todos los paquetes necesarios:
   - React
   - React DOM
   - TypeScript
   - Vite
   - Tailwind CSS
   - Lucide React (iconos)
   - Axios (para consumir la API)
   - Y otros paquetes de desarrollo

3. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Accede a la aplicación:**
   
   Abre tu navegador y ve a la URL que aparece en la terminal (generalmente: `http://localhost:5173`)

---

## Scripts de Base de Datos

### Estructura de Archivos

```
├── db_Beneficiarios.sql      # Script para crear la base de datos
├── sp_Beneficiarios.sql      # Scripts de stored procedures
└── datos_Beneficiarios.sql   # Datos de prueba
```

### Información de las Tablas

- **Beneficiarios**: Almacena la información de los beneficiarios
- **DocumentosIdentidad**: Almacena los tipos de documentos de identidad

### Stored Procedures Incluidos

Los stored procedures disponibles incluyen:

- Obtener todos los beneficiarios
- Obtener beneficiario por ID
- Crear nuevos beneficiarios
- Actualizar beneficiarios
- Eliminar beneficiarios
- Obtener documentos de identidad

---

## Flujo Completo de Ejecución

1. ✅ Ejecuta los scripts SQL en el orden indicado (db → sp → datos)
2. ✅ Configura la cadena de conexión en `appsettings.json`
3. ✅ Ejecuta `dotnet run` en la carpeta `Beneficiarios_App`
4. ✅ En otra terminal, navega a `Frontend` y ejecuta `npm install`
5. ✅ Ejecuta `npm run dev` en la carpeta `Frontend`
6. ✅ Abre el navegador con la URL del frontend
7. ✅ ¡Conectado y listo para usar!

---

## Notas Importantes

- Asegúrate de que SQL Server esté en ejecución antes de iniciar el backend
- El backend debe estar ejecutándose antes de abrir el frontend (la aplicación no funcionará sin la API)
- Si cambias el puerto del backend, actualiza la URL de la API en el frontend (archivo `Frontend/src/services/api.ts`)
- Para desarrollo, es recomendable mantener ambas terminales abiertas (backend y frontend)
