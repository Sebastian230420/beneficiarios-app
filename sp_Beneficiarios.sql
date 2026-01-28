
USE db_beneficiarios;
GO

/* ============================
   SP: Listar Documentos Activos
============================ */
IF OBJECT_ID('sp_ListarDocumentosIdentidadActivos') IS NOT NULL
    DROP PROCEDURE sp_ListarDocumentosIdentidadActivos;
GO

CREATE PROCEDURE sp_ListarDocumentosIdentidadActivos
AS
BEGIN
    SELECT
        Id,
        Nombre,
        Abreviatura,
        Pais,
        Longitud,
        SoloNumeros
    FROM DocumentoIdentidad
    WHERE Activo = 1;
END;
GO

/* ============================
   SP: Listar Beneficiarios
============================ */
IF OBJECT_ID('sp_ListarBeneficiarios') IS NOT NULL
    DROP PROCEDURE sp_ListarBeneficiarios;
GO

CREATE PROCEDURE sp_ListarBeneficiarios
AS
BEGIN
    SELECT
        b.Id,
        b.Nombres,
        b.Apellidos,
        b.DocumentoIdentidadId,
        b.NumeroDocumento,
        b.FechaNacimiento,
        b.Sexo,
        d.Id,
        d.Nombre,
        d.Abreviatura,
        d.Pais,
        d.Longitud,
        d.SoloNumeros,
        d.Activo
    FROM Beneficiario b
    INNER JOIN DocumentoIdentidad d
        ON b.DocumentoIdentidadId = d.Id;
END;
GO


/* ============================
   SP: Insertar Beneficiario
============================ */
IF OBJECT_ID('sp_InsertarBeneficiario') IS NOT NULL
    DROP PROCEDURE sp_InsertarBeneficiario;
GO

CREATE PROCEDURE sp_InsertarBeneficiario
(
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
)
AS
BEGIN
    DECLARE @Longitud INT;
    DECLARE @SoloNumeros BIT;

    SELECT
        @Longitud = Longitud,
        @SoloNumeros = SoloNumeros
    FROM DocumentoIdentidad
    WHERE Id = @DocumentoIdentidadId
      AND Activo = 1;

    IF @Longitud IS NULL
    BEGIN
        RAISERROR('Tipo de documento inválido o inactivo', 16, 1);
        RETURN;
    END

    IF LEN(@NumeroDocumento) <> @Longitud
    BEGIN
        RAISERROR('La longitud del número de documento es incorrecta', 16, 1);
        RETURN;
    END

    IF @SoloNumeros = 1 AND @NumeroDocumento LIKE '%[^0-9]%'
    BEGIN
        RAISERROR('El documento solo debe contener solo números', 16, 1);
        RETURN;
    END

    INSERT INTO Beneficiario
    (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
    VALUES
    (@Nombres, @Apellidos, @DocumentoIdentidadId, @NumeroDocumento, @FechaNacimiento, @Sexo);
END;
GO

/* ============================
   SP: Actualizar Beneficiario
============================ */
IF OBJECT_ID('sp_ActualizarBeneficiario') IS NOT NULL
    DROP PROCEDURE sp_ActualizarBeneficiario;
GO

CREATE PROCEDURE sp_ActualizarBeneficiario
(
    @Id INT,
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
)
AS
BEGIN
    UPDATE Beneficiario
    SET
        Nombres = @Nombres,
        Apellidos = @Apellidos,
        DocumentoIdentidadId = @DocumentoIdentidadId,
        NumeroDocumento = @NumeroDocumento,
        FechaNacimiento = @FechaNacimiento,
        Sexo = @Sexo
    WHERE Id = @Id;
END;
GO

/* ============================
   SP: Eliminar Beneficiario
============================ */
IF OBJECT_ID('sp_EliminarBeneficiario') IS NOT NULL
    DROP PROCEDURE sp_EliminarBeneficiario;
GO

CREATE PROCEDURE sp_EliminarBeneficiario
(
    @Id INT
)
AS
BEGIN
    DELETE FROM Beneficiario
    WHERE Id = @Id;
END;
GO
