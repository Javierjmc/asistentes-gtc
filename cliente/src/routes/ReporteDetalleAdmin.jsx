import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  LightBulbIcon,
  ChartBarIcon,
  EyeIcon,
  CloudIcon,
  ArrowPathIcon, // Icono para indicar carga
} from "@heroicons/react/24/outline";
import { FormularioActividades } from "../components/asistente/FormularioActividades";
import { FormularioObjetivos } from "../components/asistente/FormularioObjetivos";
import { FormularioSugerencias } from "../components/asistente/FormularioSugerencias";
import { FormularioMetricas } from "../components/asistente/FormularioMetricas";
import { VistaPreviaPDF } from "../components/asistente/VistaPreviaPDF";
import { Layout } from "../layout/Layout";
import { useStore } from "../store";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReporteDocumento from "../components/pdf/ReporteDocumento";
import PdfIframe from "../components/pdf/PdfIframe";
import api from "../api/client";
import PDFReport from "../components/pdf/PDFReport";

export const ReporteDetalleAdmin = () => {
  const { reporteId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Datos");
  const [reporte, setReporte] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminTexto, setAdminTexto] = useState("");
  const [adminImagenes, setAdminImagenes] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // <--- NUEVO ESTADO PARA CARGA

  const {
    setActividades,
    setGoals,
    setSugerencias,
    setScreenshots,
    resetForms,
  } = useStore();

  const memoDoc = useMemo(() => {
    if (!reporte) return null;
    return (
      <ReporteDocumento
        titulo={reporte.titulo}
        clienteNombre={reporte.cliente?.nombre}
        asistenteNombre={reporte.asistente?.nombre}
        fecha={reporte.fecha_creacion}
        contenido={reporte.contenido}  
        adminTexto={adminTexto || reporte.admin_texto}
        adminImagenes={adminImagenes}
        allowImages={true}
      />
    );
  }, [
    reporte?.titulo,
    reporte?.cliente?.nombre,
    reporte?.asistente?.nombre,
    reporte?.fecha_creacion,
    JSON.stringify(reporte?.contenido || {}),
    adminTexto,
    adminImagenes,
  ]);

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const { data } = await api.get(`/reportes/${reporteId}`);
        console.log("Datos del reporte obtenidos:", data);
        setReporte(data);
        if (data.contenido) {
          setActividades(data.contenido.actividades || []);
          setGoals(data.contenido.goals || []);
          setSugerencias(data.contenido.sugerencias || []);
          setScreenshots(data.contenido.screenshots || []);
        }
        if (typeof data.admin_texto === 'string') setAdminTexto(data.admin_texto);
        // La carga inicial solo necesita el URL (preview)
        if (Array.isArray(data.admin_imagenes)) setAdminImagenes(data.admin_imagenes.map((src) => ({ preview: src })));
      } catch (e) {
        setError(e.message || 'Error al obtener el reporte.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReporte();
  }, [reporteId, setActividades, setGoals, setSugerencias]);

  const handleUpdateReport = async () => {
    if (isUploading) {
        alert("Por favor, espera a que termine la subida de imágenes.");
        return;
    }
    try {
      const { actividades, goals, sugerencias } = useStore.getState();
      const reporteActualizado = {        
        titulo: reporte.titulo,
        contenido: { actividades, goals, sugerencias },
        admin_texto: adminTexto,
        // Al guardar, solo enviamos el array de URLs (preview) a MongoDB
        admin_imagenes: adminImagenes.map((img) => img.preview),
      };

      await api.put(`/reportes/${reporteId}`, reporteActualizado);
      alert("Reporte actualizado exitosamente.");
      navigate('/informes-administrador');
    } catch (error) {
      alert(error.message || 'Error al actualizar el reporte.');
    }
  };

  // <--- MODIFICACIÓN CLAVE: SUBIDA A CLOUDINARY A TRAVÉS DE FLASK --->
  const handleAdminImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        // 1. Crear FormData para el archivo
        const formData = new FormData();
        // 'image' debe coincidir con el nombre esperado en app.py: request.files['image']
        formData.append('image', file); 

        // 2. Subir a Cloudinary a través del backend
        const { data } = await api.post('/upload-image', formData, {
          headers: {
            // Asegura que el navegador establezca el Content-Type correcto para FormData
            'Content-Type': 'multipart/form-data', 
          },
        });
        
        // 3. Si la subida es exitosa, guardar la URL de Cloudinary
        uploadedUrls.push({ preview: data.url, name: file.name });
      }

      // 4. Actualizar el estado con las URLs de Cloudinary
      setAdminImagenes((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      alert('Error al subir una o más imágenes. Verifica la consola para más detalles.');
    } finally {
      setIsUploading(false);
      // Limpiar el input de archivo para poder subir la misma imagen de nuevo si es necesario
      e.target.value = null; 
    }
  };
  // <--- FIN DE MODIFICACIÓN CLAVE --->

  const removeAdminImage = (index) => {
    setAdminImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <Layout rol="administrador">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg">
          <h2 className="text-center font-extrabold text-2xl mb-4 text-slate-800">
            Cargando Reporte...
          </h2>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout rol="administrador">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg">
          <h2 className="text-center font-extrabold text-2xl mb-4 text-slate-800">
            Error
          </h2>
          <p className="text-red-500">{error}</p>
        </section>
      </Layout>
    );
  }

  const tabs = [
    { name: "Actividades", icon: ClipboardDocumentListIcon },
    { name: "Objetivos", icon: TrophyIcon },
    { name: "Sugerencias", icon: LightBulbIcon },
    { name: "Métricas", icon: ChartBarIcon },
    { name: "Datos", icon: CloudIcon },
    { name: "Ver PDF", icon: EyeIcon },
  ];

  return (
    <Layout rol="administrador">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg">
        <h2 className="text-center font-extrabold text-2xl mb-4 text-slate-800">
          Detalles y Edición de Reporte
        </h2>

        {/* Navegación del formulario */}
        <nav className="flex justify-center border-b border-gray-300">
          <ul className="flex justify-center flex-wrap gap-4 sm:gap-6">
            {tabs.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name} className="flex-1 min-w-0">
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center justify-center py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-colors duration-200 border-b-2
                      ${activeTab === item.name
                        ? "border-blue-700 text-blue-700"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 mr-1 ${activeTab === item.name
                          ? "text-blue-700"
                          : "text-slate-500 group-hover:text-slate-700"
                        }`}
                    />
                    <span className="hidden sm:flex">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contenido dinámico */}
        <div className="mt-8 rounded-xl max-w-5xl mx-auto text-center text-lg text-gray-700">
          {activeTab === "Actividades" && <FormularioActividades />}
          {activeTab === "Objetivos" && <FormularioObjetivos />}
          {activeTab === "Sugerencias" && <FormularioSugerencias />}
          {activeTab === "Métricas" && <FormularioMetricas />}
          {activeTab === "Datos" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleUpdateReport}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                  disabled={isUploading} // Deshabilita el botón mientras sube
                >
                  {isUploading ? (
                     <>
                        <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                        Subiendo...
                     </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForms}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duración-300"
                >
                  Borrar Formulario
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-left space-y-4">
                <label htmlFor="admin-notes" className="block text-xl font-bold text-gray-800">
                  Notas del Administrador
                </label>
                <textarea
                  id="admin-notes"
                  value={adminTexto}
                  onChange={(e) => setAdminTexto(e.target.value)}
                  className="w-full min-h-[140px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ease-in-out resize-y text-gray-700 placeholder-gray-400"
                  placeholder="Escribe comentarios o notas importantes para el cliente aquí..."
                />

                {/* UI para imágenes del administrador */}
                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700">Imágenes del Administrador</label>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleAdminImagesChange}
                    disabled={isUploading} // Deshabilita el input mientras sube
                  />
                  {isUploading && (
                     <p className="flex items-center text-sm text-blue-600">
                        <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                        Subiendo imágenes... espera un momento.
                     </p>
                  )}
                  {adminImagenes.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                      {adminImagenes.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img.preview} alt={img.name || `img-${i}`} className="w-full h-24 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => removeAdminImage(i)}
                            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <VistaPreviaPDF />
            </div>
          )}
          {activeTab === "Ver PDF" && reporte && (
            <div className="h-[80vh] flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <PDFReport reporte={reporte} adminTexto={reporte.adminTexto} />
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};