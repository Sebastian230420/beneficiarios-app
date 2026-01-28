import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BeneficiarioForm } from './components/BeneficiarioForm';
import { BeneficiarioFilters } from './components/BeneficiarioFilters';
import { BeneficiarioTable } from './components/BeneficiarioTable';
import { Beneficiario, BeneficiarioCreateDto, DocumentoIdentidad } from './types/api';
import { beneficiarioService, documentoIdentidadService } from './services/api';

function App() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<BeneficiarioCreateDto | null>(null);
  
  // Estados de filtros
  const [searchName, setSearchName] = useState('');
  const [selectedDocumento, setSelectedDocumento] = useState(0);
  const [selectedSexo, setSelectedSexo] = useState('');

  useEffect(() => {
    loadBeneficiarios();
    loadDocumentos();
  }, []);

  const loadDocumentos = async () => {
    try {
      const data = await documentoIdentidadService.getActivos();
      setDocumentos(data);
    } catch (err: any) {
      console.error('Error loading documentos:', err);
    }
  };

  const loadBeneficiarios = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await beneficiarioService.getAll();
      setBeneficiarios(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar los beneficiarios. Asegúrate de que el servidor está en ejecución en https://localhost:7197';
      setError(errorMessage);
      console.error('Error loading beneficiarios:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para filtrar beneficiarios
  const getFilteredBeneficiarios = (): Beneficiario[] => {
    return beneficiarios.filter((beneficiario) => {
      // Filtro por nombre (nombres o apellidos)
      const matchesName =
        !searchName ||
        beneficiario.nombres.toLowerCase().includes(searchName.toLowerCase()) ||
        beneficiario.apellidos.toLowerCase().includes(searchName.toLowerCase());

      // Filtro por tipo de documento
      const matchesDocumento =
        !selectedDocumento || beneficiario.documentoIdentidadId === selectedDocumento;

      // Filtro por sexo
      const matchesSexo = !selectedSexo || beneficiario.sexo === selectedSexo;

      return matchesName && matchesDocumento && matchesSexo;
    });
  };

  const handleCreateBeneficiario = async (beneficiario: BeneficiarioCreateDto) => {
    try {
      setIsLoading(true);
      setError(null);
      if (editingId) {
        // Modo edición
        await beneficiarioService.update(editingId, beneficiario);
        setSuccessMessage('✅ ¡Beneficiario actualizado exitosamente!');
      } else {
        // Modo creación
        await beneficiarioService.create(beneficiario);
        setSuccessMessage('✅ ¡Beneficiario creado exitosamente!');
      }
      setShowForm(false);
      setEditingId(null);
      setEditFormData(null);
      await loadBeneficiarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      const message = err.message || (editingId
        ? 'Error al actualizar el beneficiario. Por favor, intenta de nuevo.'
        : 'Error al crear el beneficiario. Por favor, intenta de nuevo.');
      setError(`❌ ${message}`);
      console.error('Error saving beneficiario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBeneficiario = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await beneficiarioService.delete(id);
      setSuccessMessage('✅ ¡Beneficiario eliminado exitosamente!');
      await loadBeneficiarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      const message = err.message || 'Error al eliminar el beneficiario. Por favor, intenta de nuevo.';
      setError(`❌ ${message}`);
      console.error('Error deleting beneficiario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBeneficiario = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const beneficiario = await beneficiarioService.getById(id);
      setEditingId(id);
      setEditFormData({
        nombres: beneficiario.nombres,
        apellidos: beneficiario.apellidos,
        documentoIdentidadId: beneficiario.documentoIdentidadId,
        numeroDocumento: beneficiario.numeroDocumento,
        fechaNacimiento: beneficiario.fechaNacimiento,
        sexo: beneficiario.sexo,
      });
      setShowForm(true);
    } catch (err: any) {
      const message = err.message || 'Error al cargar los datos del beneficiario para editar. Por favor, intenta de nuevo.';
      setError(`❌ ${message}`);
      console.error('Error loading beneficiario for edit:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchName('');
    setSelectedDocumento(0);
    setSelectedSexo('');
  };

  const filteredBeneficiarios = getFilteredBeneficiarios();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Beneficiarios</h2>
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setEditingId(null);
                  setEditFormData(null);
                }
              }}
              disabled={isLoading}
            >
              {showForm ? '✕ Cerrar formulario' : '+ Nuevo Beneficiario'}
            </button>
          </div>

          {error && <div className="p-3 sm:p-4 rounded-lg mb-4 font-medium bg-red-100 border border-red-400 text-red-700 text-sm sm:text-base">{error}</div>}
          {successMessage && <div className="p-3 sm:p-4 rounded-lg mb-4 font-medium bg-green-100 border border-green-400 text-green-700 text-sm sm:text-base">{successMessage}</div>}

          {showForm && (
            <BeneficiarioForm
              onSubmit={handleCreateBeneficiario}
              initialValues={editFormData || undefined}
              isLoading={isLoading}
              isEditing={editingId !== null}
            />
          )}

          {!showForm && (
            <BeneficiarioFilters
              searchName={searchName}
              selectedDocumento={selectedDocumento}
              selectedSexo={selectedSexo}
              onSearchChange={setSearchName}
              onDocumentoChange={setSelectedDocumento}
              onSexoChange={setSelectedSexo}
              onReset={handleResetFilters}
              documentos={documentos}
              isLoading={isLoading}
            />
          )}

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mt-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Beneficiarios ({filteredBeneficiarios.length} de {beneficiarios.length})
            </h3>
            {isLoading && !showForm ? (
              <div className="text-center py-8 text-gray-600">Cargando...</div>
            ) : (
              <BeneficiarioTable
                beneficiarios={filteredBeneficiarios}
                onEdit={handleEditBeneficiario}
                onDelete={handleDeleteBeneficiario}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
