/* =========================================================
   SCRIPT 01 - CREACIÓN DE BD Y TABLAS
   Base de Datos: db_beneficiarios
========================================================= */

IF DB_ID('db_beneficiarios') IS NOT NULL
BEGIN
    ALTER DATABASE db_beneficiarios SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE db_beneficiarios;
END
GO

CREATE DATABASE db_beneficiarios;
GO

USE db_beneficiarios;
GO

/* ============================
   TABLA: DocumentoIdentidad
============================ */
CREATE TABLE DocumentoIdentidad (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Abreviatura VARCHAR(10) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Longitud INT NOT NULL,
    SoloNumeros BIT NOT NULL,
    Activo BIT NOT NULL
);
GO

/* ============================
   TABLA: Beneficiario
============================ */
CREATE TABLE Beneficiario (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    DocumentoIdentidadId INT NOT NULL,
    NumeroDocumento VARCHAR(20) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Sexo CHAR(1) NOT NULL,
    CONSTRAINT FK_Beneficiario_Documento
        FOREIGN KEY (DocumentoIdentidadId)
        REFERENCES DocumentoIdentidad(Id)
);
GO

Select * from Beneficiario