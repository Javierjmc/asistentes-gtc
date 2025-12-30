import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Titulo } from "../components/Titulo";
import { useStore } from "../store";

export const InformesAdministrador = () => {
  const { reports, fetchReports, /* approveReport, */ sendReport } = useStore();

  const [filterAsistente, setFilterAsistente] = useState('');
  const [filterCliente, setFilterCliente] = useState('');

  const filteredReports = useMemo(() => {
    const fa = filterAsistente.trim().toLowerCase();
    const fc = filterCliente.trim().toLowerCase();
    if (!fa && !fc) return reports;
    return reports.filter((r) => {
      const asistenteNombre = (r.asistente?.nombre || '').toLowerCase();
      const clienteNombre = (r.cliente?.nombre || r.cliente?.empresa || '').toLowerCase();
      return (fa === '' || asistenteNombre.includes(fa)) && (fc === '' || clienteNombre.includes(fc));
    });
  }, [reports, filterAsistente, filterCliente]);

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
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            type="text"
            value={filterAsistente}
            onChange={(e) => setFilterAsistente(e.target.value)}
            placeholder="Filtrar por asistente"
            className="px-2 py-1 rounded border border-slate-400 text-sm"
          />
          <input
            type="text"
            value={filterCliente}
            onChange={(e) => setFilterCliente(e.target.value)}
            placeholder="Filtrar por cliente / empresa"
            className="px-2 py-1 rounded border border-slate-400 text-sm"
          />
          {(filterAsistente || filterCliente) && (
            <button
              onClick={() => { setFilterAsistente(''); setFilterCliente(''); }}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Limpiar
            </button>
          )}
        </div>
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          <li className="grid grid-cols-4 bg-slate-700 text-slate-200 font-semibold text-center text-xs sm:text-sm">
            <span className="py-2 col-span-1">Asistente</span>
            <span className="py-2 col-span-1">Cliente</span>
            <span className="py-2 col-span-1">Fecha</span>
            <span className="py-2 col-span-1">Acciones</span>
          </li>
          {filteredReports.length > 0 ? (
            filteredReports.map((reporte, index) => (
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
              No se encontraron reportes para los filtros aplicados.
            </li>
          )}
        </ul>
      </section>
    </Layout>
  );
};