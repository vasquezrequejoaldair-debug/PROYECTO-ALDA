import React, { useState } from 'react';
import { 
  FolderArchive, 
  UploadCloud, 
  FileText, 
  FileSpreadsheet, 
  Image, 
  FileCode, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X,
  Plus,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { RealEstateMarketingState, DocumentItem } from '../types';

interface DocumentManagerViewProps {
  state: RealEstateMarketingState;
  onUpdateState: (newState: Partial<RealEstateMarketingState>) => void;
  onUploadDoc: (doc: Partial<DocumentItem>) => Promise<void>;
  onDeleteDoc: (id: string) => Promise<void>;
}

export const DocumentManagerView: React.FC<DocumentManagerViewProps> = ({
  state,
  onUpdateState,
  onUploadDoc,
  onDeleteDoc
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Upload Form State
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentItem['category']>('Causa A');
  const [docToolRef, setDocToolRef] = useState('A.2 Matriz Operativa');
  const [docDescription, setDocDescription] = useState('');
  const [docAuthor, setDocAuthor] = useState('Coordinador Comercial');
  const [selectedFileType, setSelectedFileType] = useState<DocumentItem['fileType']>('pdf');
  const [fileBase64, setFileBase64] = useState<string | undefined>(undefined);
  const [fileSizeStr, setFileSizeStr] = useState('1.2 MB');

  // Filtered documents
  const filteredDocs = state.documents.filter(doc => {
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.toolRef.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSizeStr(`${sizeMb} MB`);

      if (file.type.includes('image')) setSelectedFileType('image');
      else if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) setSelectedFileType('xlsx');
      else if (file.type.includes('word') || file.name.endsWith('.docx')) setSelectedFileType('docx');
      else setSelectedFileType('pdf');

      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;

    try {
      setIsUploading(true);
      await onUploadDoc({
        name: docName,
        category: docCategory,
        toolRef: docToolRef,
        fileType: selectedFileType,
        sizeFormatted: fileSizeStr,
        description: docDescription,
        uploadedBy: docAuthor,
        fileDataUrl: fileBase64
      });

      setShowUploadModal(false);
      setDocName('');
      setDocDescription('');
      setFileBase64(undefined);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (type: DocumentItem['fileType']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-rose-500" />;
      case 'xlsx':
        return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-sky-500" />;
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <FileCode className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 border border-slate-700/80 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5" />
                Módulo de Gestión Documental
              </span>
              <span className="text-xs text-slate-400">• Entregables de Lotes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Repositorio y Clasificación de Archivos Adjuntos
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Carga, clasifica por Causa (A, B, C, D) y visualiza los entregables tangibles requeridos: manuales SOP, matrices, planos perimétricos y registros de evaluaciones.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Cargar Nuevo Entregable</span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-700/60 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Total Documentos</div>
            <div className="text-xl font-black text-white mt-0.5">{state.documents.length}</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Causa A (Planificación)</div>
            <div className="text-xl font-black text-indigo-400 mt-0.5">
              {state.documents.filter(d => d.category === 'Causa A').length}
            </div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Causa B (Capacitación)</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              {state.documents.filter(d => d.category === 'Causa B').length}
            </div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Causa C y D (Herr. y Redes)</div>
            <div className="text-xl font-black text-purple-400 mt-0.5">
              {state.documents.filter(d => d.category === 'Causa C' || d.category === 'Causa D').length}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, herramienta o autor..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {['ALL', 'Causa A', 'Causa B', 'Causa C', 'Causa D', 'General'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:border-sky-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {doc.category}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  {doc.sizeFormatted}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2" title={doc.name}>
                {doc.name}
              </h4>

              <div className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold mt-1">
                {doc.toolRef}
              </div>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {doc.description || 'Sin descripción adicional.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between items-center text-slate-400 mb-3 text-[11px]">
                <span>Por: {doc.uploadedBy}</span>
                <span>{doc.uploadedAt}</span>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visualizar</span>
                </button>
                <button
                  onClick={() => onDeleteDoc(doc.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  title="Eliminar archivo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center text-slate-400">
          <FolderArchive className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="font-semibold text-sm">No se encontraron entregables con los filtros seleccionados.</p>
          <p className="text-xs mt-1">Presiona "Cargar Nuevo Entregable" para subir los soportes de tu causa.</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <form 
            onSubmit={handleSubmitUpload}
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Cargar y Clasificar Entregable
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag and Drop / Input file */}
            <div className="border-2 border-dashed border-sky-300 dark:border-sky-800/80 rounded-xl p-4 text-center bg-sky-50/50 dark:bg-sky-950/20">
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                <UploadCloud className="w-8 h-8 text-sky-600 mb-1" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {docName ? docName : 'Haz clic para seleccionar archivo o plano'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Formatos soportados: PDF, XLSX, DOCX, PNG, JPG (Hasta 50MB)
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Clasificar por Causa</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  <option value="Causa A">Causa A (Planificación)</option>
                  <option value="Causa B">Causa B (Capacitación)</option>
                  <option value="Causa C">Causa C (Herramientas)</option>
                  <option value="Causa D">Causa D (Redes Sociales)</option>
                  <option value="General">General Inmobiliaria</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Herramienta Vinculada</label>
                <input
                  type="text"
                  required
                  value={docToolRef}
                  onChange={(e) => setDocToolRef(e.target.value)}
                  placeholder="Ej. A.2 Matriz Operativa"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Nombre del Documento</label>
              <input
                type="text"
                required
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="Ej. Informe_Embudo_Campana_Meta_Lotes.pdf"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Descripción del Contenido</label>
              <textarea
                rows={2}
                value={docDescription}
                onChange={(e) => setDocDescription(e.target.value)}
                placeholder="Breve resumen del entregable adjunto..."
                className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{isUploading ? 'Subiendo...' : 'Guardar y Clasificar'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Document Viewer Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {getFileIcon(previewDoc.fileType)}
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {previewDoc.name}
                  </h4>
                  <div className="text-[11px] text-slate-400">
                    {previewDoc.category} • {previewDoc.toolRef}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content Simulation */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center min-h-[220px] flex flex-col items-center justify-center space-y-3">
              {previewDoc.fileDataUrl && previewDoc.fileType === 'image' ? (
                <img 
                  src={previewDoc.fileDataUrl} 
                  alt={previewDoc.name} 
                  className="max-h-72 object-contain rounded shadow"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-600">
                    {getFileIcon(previewDoc.fileType)}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      Entregable de Validación Comercial
                    </h5>
                    <p className="text-xs text-slate-500 max-w-md mt-1">
                      {previewDoc.description || 'Archivo adjunto clasificado para el cumplimiento de causas de marketing.'}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verificado y Almacenado Seguro</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Subido por: {previewDoc.uploadedBy} ({previewDoc.uploadedAt})</span>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
