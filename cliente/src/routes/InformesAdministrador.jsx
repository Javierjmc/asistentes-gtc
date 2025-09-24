import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Titulo } from "../components/Titulo";
import { useStore } from "../store";

export const InformesAdministrador = () => {
  const { reports, fetchReports, /* approveReport, */ sendReport } = useStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Aprobación deshabilitada
  // const handleApprove = async (reporteId) => {
  //   const res = await approveReport(reporteId);
  //   if (!res.success) alert(res.error);
  // };

  const handleSendReport = async (reporteId) => {
    const res = await sendReport(reporteId);
    if (!res.success) alert(res.error);
  };

  return (
    <Layout rol="administrador">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
        <Titulo contenido="Informes" />
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          <li className="grid grid-cols-4 bg-slate-700 text-slate-200 font-semibold text-center text-xs sm:text-sm">
            <span className="py-2 col-span-1">Asistente</span>
            <span className="py-2 col-span-1">Cliente</span>
            <span className="py-2 col-span-1">Fecha</span>
            <span className="py-2 col-span-1">Acciones</span>
          </li>
          {reports.length > 0 ? (
            reports.map((reporte, index) => (
              <li
                key={reporte._id || index}
                className="grid grid-cols-4 bg-white text-slate-800 border-t border-slate-400 text-xs sm:text-sm even:bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <span className="text-center py-2 col-span-1">
                  {reporte.asistente ? reporte.asistente.nombre : 'Desconocido'}
                </span>
                <span className="text-center py-2 col-span-1">
                  {reporte.cliente ? reporte.cliente.nombre : 'Desconocido'}
                </span>
                <span className="text-center py-2 col-span-1">
                  {reporte.fecha_creacion || ''}
                </span>
                <div className="flex justify-center items-center gap-2 col-span-1">
                  <Link to={`/reportes-administrador/${reporte._id || index}`}>
                    <button className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition">
                      Ver
                    </button>
                  </Link>
                  {/* Botón Aprobar deshabilitado */}
                  {reporte.estado !== 'enviado' && (
                    <button 
                      onClick={() => handleSendReport(reporte._id || index)}
                      className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition"
                    >
                      Enviar
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="text-center py-4 text-slate-500 col-span-4">
              No se encontraron reportes.
            </li>
          )}
        </ul>
      </section>
    </Layout>
  );
};