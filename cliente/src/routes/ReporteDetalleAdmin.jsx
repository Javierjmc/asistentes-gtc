import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  LightBulbIcon,
  ChartBarIcon,
  EyeIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import { FormularioActividades } from "../components/asistente/FormularioActividades";
import { FormularioObjetivos } from "../components/asistente/FormularioObjetivos";
import { FormularioSugerencias } from "../components/asistente/FormularioSugerencias";
// import { FormularioMetricas } from "../components/asistente/FormularioMetricas";
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
  // Comentado temporalmente: manejo de imágenes del administrador
  // const [adminImagenes, setAdminImagenes] = useState([]); // [{preview, file/base64}]

  const {
    setActividades,
    setGoals,
    setSugerencias,
    // setScreenshots, // métricas deshabilitadas
    resetForms,
  } = useStore();

  // Memo del documento PDF para evitar recreaciones innecesarias
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
        // adminImagenes deshabilitado temporalmente
        allowImages={false}
      />
    );
  }, [
    reporte?.titulo,
    reporte?.cliente?.nombre,
    reporte?.asistente?.nombre,
    reporte?.fecha_creacion,
    JSON.stringify(reporte?.contenido || {}),
    adminTexto,
    // adminImagenes deshabilitado
  ]);

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const { data } = await api.get(`/reportes/${reporteId}`);
        setReporte(data);
        if (data.contenido) {
          setActividades(data.contenido.actividades || []);
          setGoals(data.contenido.goals || []);
          setSugerencias(data.contenido.sugerencias || []);
          // setScreenshots(data.contenido.screenshots || []); // métricas deshabilitadas
        }
    if (typeof data.admin_texto === 'string') setAdminTexto(data.admin_texto);
    // Comentado temporalmente: carga inicial de imágenes del administrador
    // if (Array.isArray(data.admin_imagenes)) setAdminImagenes(data.admin_imagenes.map((src) => ({ preview: src })));
      } catch (e) {
        setError(e.message || 'Error al obtener el reporte.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReporte();
  }, [reporteId, setActividades, setGoals, setSugerencias]);

  const handleUpdateReport = async () => {
    try {
      const { actividades, goals, sugerencias } = useStore.getState();

      const reporteActualizado = {
        titulo: reporte.titulo,
        contenido: { actividades, goals, sugerencias },
        admin_texto: adminTexto,
        // Comentado temporalmente: envío de imágenes del administrador
        // admin_imagenes: adminImagenes.map((img) => img.preview),
      };

      await api.put(`/reportes/${reporteId}`, reporteActualizado);
      alert("Reporte actualizado exitosamente.");
      navigate('/informes-administrador');
    } catch (error) {
      alert(error.message || 'Error al actualizar el reporte.');
    }
  };

  // Comentado temporalmente: carga de archivos de imágenes
  // const handleAdminImagesChange = async (e) => {
  //   const files = Array.from(e.target.files || []);
  //   const reads = await Promise.all(files.map((file) => new Promise((res, rej) => {
  //     const reader = new FileReader();
  //     reader.onload = () => res({ preview: reader.result, name: file.name });
  //     reader.onerror = rej;
  //     reader.readAsDataURL(file);
  //   })));
  //   setAdminImagenes((prev) => [...prev, ...reads]);
  // };

  // Comentado temporalmente: eliminación de imágenes del administrador
  // const removeAdminImage = (index) => {
  //   setAdminImagenes((prev) => prev.filter((_, i) => i !== index));
  // };

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

  console.log('reporte desde ReporteDetalleAdmin', reporte);
  console.log('adminTexto desde ReporteDetalleAdmin', adminTexto);

  const tabs = [
    { name: "Actividades", icon: ClipboardDocumentListIcon },
    { name: "Objetivos", icon: TrophyIcon },
    { name: "Sugerencias", icon: LightBulbIcon },
    // { name: "Métricas", icon: ChartBarIcon }, // deshabilitado
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
                      ${
                        activeTab === item.name
                          ? "border-blue-700 text-blue-700"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 mr-1 ${
                        activeTab === item.name
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
          {/* {activeTab === "Métricas" && <FormularioMetricas />} */}
          {activeTab === "Datos" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleUpdateReport}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={resetForms}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duración-300"
                >
                  Borrar Formulario
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-left space-y-3">
                <label className="block font-semibold text-slate-700">Notas del Administrador</label>
                <textarea
                  value={adminTexto}
                  onChange={(e) => setAdminTexto(e.target.value)}
                  className="w-full min-h-28 p-2 border rounded-md"
                  placeholder="Escribe comentarios o notas para el cliente..."
                />
                {/* Comentado temporalmente: UI para imágenes del administrador */}
                {/* <div className="space-y-2">
                  <label className="block font-semibold text-slate-700">Imágenes del Administrador</label>
                  <input type="file" multiple accept="image/*" onChange={handleAdminImagesChange} />
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
                </div> */}
              </div>
              <VistaPreviaPDF />
            </div>
          )}
          {activeTab === "Ver PDF" && reporte && (
            <div className="h-[80vh] flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <PDFReport reporte={reporte} adminTexto={adminTexto} />
                
                {/* <PDFDownloadLink document={memoDoc} fileName={`${reporte?.titulo || 'reporte'}.pdf`} className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700">
                  {({ loading, error }) => loading ? 'Generando PDF…' : (error ? 'Error al generar PDF' : 'Descargar PDF')}
                </PDFDownloadLink>
              </div>
              <div className="flex-1">
                <PdfIframe
                  style={{ width: '100%', height: '100%', border: '0' }}
                  document={memoDoc}
                /> */}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};