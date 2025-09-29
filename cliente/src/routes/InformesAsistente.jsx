import { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import api from "../api/client";

export const InformesAsistente = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    const fetchMyReports = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/reportes/mis');
        setReportes(data);
      } catch (e) {
        setError(e?.response?.data?.msg || e.message || 'Error al cargar los informes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyReports();
  }, []);

  return (
    <Layout rol="asistente">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg">
        <h2 className="text-center font-extrabold text-2xl mb-4 text-slate-800">Mis Informes</h2>
        {isLoading && <p className="text-center">Cargando…</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!isLoading && !error && !seleccionado && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">Cliente</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((r) => (
                  <tr
                    key={r._id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSeleccionado(r)}
                    title="Ver detalles"
                  >
                    <td className="px-4 py-2">{r.titulo}</td>
                    <td className="px-4 py-2">{r.cliente?.nombre || '—'}</td>
                    <td className="px-4 py-2 capitalize">{r.estado}</td>
                    <td className="px-4 py-2">{r.fecha_creacion ? new Date(r.fecha_creacion).toLocaleString('es-ES') : '—'}</td>
                  </tr>
                ))}
                {reportes.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No tienes informes aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !error && seleccionado && (
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{seleccionado.titulo}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Cliente: <span className="font-medium">{seleccionado.cliente?.nombre || '—'}</span>
                  {' · '}Estado: <span className="font-medium capitalize">{seleccionado.estado || '—'}</span>
                  {' · '}Fecha: <span className="font-medium">{seleccionado.fecha_creacion ? new Date(seleccionado.fecha_creacion).toLocaleString('es-ES') : '—'}</span>
                </p>
              </div>
              <button
                onClick={() => setSeleccionado(null)}
                className="px-3 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm"
              >
                Volver
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Actividades</h4>
                {Array.isArray(seleccionado.contenido?.actividades) && seleccionado.contenido.actividades.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-slate-800">
                    {seleccionado.contenido.actividades.map((a, i) => (
                      <li key={i}><span className="font-medium">{String(a.titulo || a.category || '')}:</span> {String(a.descripcion || a.description || '')}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">Sin actividades.</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Objetivos</h4>
                {Array.isArray(seleccionado.contenido?.goals) && seleccionado.contenido.goals.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-slate-800">
                    {seleccionado.contenido.goals.map((g, i) => (
                      <li key={i}><span className="font-medium">{String(g.title || g.titulo || '')}:</span> {String(g.description || g.descripcion || '')}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">Sin objetivos.</p>
                )}
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-slate-700 mb-2">Sugerencias</h4>
                {Array.isArray(seleccionado.contenido?.sugerencias) && seleccionado.contenido.sugerencias.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-slate-800">
                    {seleccionado.contenido.sugerencias.map((s, i) => (
                      <li key={i}>{String(s?.texto ?? s ?? '')}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">Sin sugerencias.</p>
                )}
              </div>
              <div className="md:col-span-2">
                <h4 className="font-semibold text-slate-700 mb-2">Métricas</h4>
                {Array.isArray(seleccionado.contenido?.screenshots) && seleccionado.contenido.screenshots.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-slate-800">
                    {seleccionado.contenido.screenshots.map((s, i) => (
                      <li key={i}>{String(s?.texto ?? s ?? '')}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">Sin métricas</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};
