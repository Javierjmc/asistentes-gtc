import { useEffect, useMemo, useState } from "react"
import { Layout } from "../layout/Layout"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ReporteDocumento from "../components/pdf/ReporteDocumento"
import PdfIframe from "../components/pdf/PdfIframe"

export const TableroCliente = () => {
  const [asistentes, setAsistentes] = useState([])
  const [reportes, setReportes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [estadoFiltro, setEstadoFiltro] = useState("todos")

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      setError("No autenticado")
      setLoading(false)
      return
    }
    const headers = { Authorization: `Bearer ${token}` }

    const fetchAll = async () => {
      try {
        const [aRes, rRes] = await Promise.all([
          fetch(API_BASE_URL+"/cliente/mis-asistentes", { headers }),
          fetch(API_BASE_URL+"/reportes/mios", { headers }),
        ])
        if (!aRes.ok) throw new Error("Error al cargar asistentes")
        if (!rRes.ok) throw new Error("Error al cargar reportes")
        const [aData, rData] = await Promise.all([aRes.json(), rRes.json()])
        setAsistentes(aData)
        setReportes(rData)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const stats = useMemo(() => {
    const total = reportes.length
    const enviados = reportes.filter(r => r.estado === 'enviado').length
    const pendientes = reportes.filter(r => r.estado === 'pendiente').length
    const editados = reportes.filter(r => r.estado === 'editado').length
    return { total, enviados, pendientes, editados }
  }, [reportes])

  const reportesFiltrados = useMemo(() => {
    if (estadoFiltro === 'todos') return reportes
    return reportes.filter(r => r.estado === estadoFiltro)
  }, [reportes, estadoFiltro])

  return (
    <Layout rol="cliente">
      <section className="py-6 px-2 sm:px-6 sm:rounded-lg">
        <div className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Bienvenido</h2>
          <p className="opacity-90 mt-1">Aquí verás tus asistentes asignados y los informes recibidos.</p>
        </div>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda: asistentes */}
            <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">Asistentes asignados</h3>
              {asistentes.length === 0 ? (
                <p className="text-slate-600">Aún no tienes asistentes asignados.</p>
              ) : (
                <ul className="space-y-3">
                  {asistentes.map(a => (
                    <li key={a.id} className="rounded-lg p-3 bg-slate-50 border border-slate-200">
                      <p className="font-semibold text-slate-900">{a.nombre}</p>
                      <p className="text-slate-600 text-sm">{a.email}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Columna derecha: reportes */}
            <div className="lg:col-span-2 space-y-4">
              {/* Tarjetas de KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow">
                  <p className="text-xs text-slate-500">Total reportes</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stats.total}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow">
                  <p className="text-xs text-slate-500">Enviados</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stats.enviados}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow">
                  <p className="text-xs text-slate-500">Pendientes</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stats.pendientes}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow">
                  <p className="text-xs text-slate-500">Editados</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stats.editados}</p>
                </div>
              </div>

              {/* Filtros */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow flex items-center gap-3">
                <label htmlFor="estado" className="text-sm text-slate-700">Filtrar por estado:</label>
                <select id="estado" value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)} className="text-sm border rounded px-2 py-1">
                  <option value="todos">Todos</option>
                  <option value="enviado">Enviados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="editado">Editados</option>
                </select>
              </div>

              <div className="bg-white rounded-xl p-4 shadow border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">Mis reportes</h3>
              {reportes.length === 0 ? (
                <p className="text-slate-600">No tienes reportes aún.</p>
              ) : (
                <div className="space-y-4">
                  {reportesFiltrados.map(r => (
                    <div key={r._id} className="rounded-lg border border-slate-200">
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{r.titulo}</p>
                          <p className="text-slate-600 text-xs">{new Date(r.fecha_creacion).toLocaleString()}</p>
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">{r.estado}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setExpanded(expanded === r._id ? null : r._id)} className="text-sm px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700">
                            {expanded === r._id ? 'Ocultar' : 'Ver'}
                          </button>
                          <PDFDownloadLink
                            document={<ReporteDocumento titulo={r.titulo} fecha={r.fecha_creacion} contenido={r.contenido} allowImages={false} />}
                            fileName={`${r.titulo || 'reporte'}.pdf`}
                            className="text-sm px-3 py-1.5 rounded border border-slate-300 text-slate-800 hover:bg-slate-50"
                          >
                            {({ loading: dloading }) => (dloading ? 'Preparando…' : 'Descargar')}
                          </PDFDownloadLink>
                        </div>
                      </div>
                      {expanded === r._id && (
                        <div className="h-[70vh] border-t border-slate-200">
                          <PdfIframe
                            style={{ width: '100%', height: '100%', border: '0' }}
                            document={
                              <ReporteDocumento
                                titulo={r.titulo}
                                fecha={r.fecha_creacion}
                                contenido={r.contenido}
                                allowImages={false}
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}
