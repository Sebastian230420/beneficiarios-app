
USE db_beneficiarios;
GO

/* ============================
   DocumentoIdentidad
============================ */
INSERT INTO DocumentoIdentidad
(Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES
('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),
('Pasaporte', 'PAS', 'Internacional', 9, 0, 1),
('Carné de Extranjería', 'CE', 'Perú', 12, 1, 1),
('Documento Antiguo', 'OLD', 'Perú', 10, 1, 0);
GO

/* ============================
   Beneficiarios (usando SP)
============================ */
EXEC sp_InsertarBeneficiario
    'Juan',
    'Pérez',
    1,
    '12345678',
    '1995-05-10',
    'M';

EXEC sp_InsertarBeneficiario
    'María',
    'Gómez',
    2,
    'A12345678',
    '1998-08-20',
    'F';
GO
