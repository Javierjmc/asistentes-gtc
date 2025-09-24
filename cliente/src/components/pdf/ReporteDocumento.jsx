import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: '#005f73',
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    height: 60,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#005f73',
  },
  section: { marginBottom: 25 },
  title: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    color: '#0a9396',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    paddingBottom: 4,
  },
  text: { fontSize: 11, marginBottom: 6, color: '#111827' },
  table: { display: 'table', width: 'auto', marginBottom: 12 },
  tableRow: { flexDirection: 'row' },
  tableRowAlt: { flexDirection: 'row', backgroundColor: '#fafafa' },
  tableColHeader: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#005f73',
    padding: 6,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 6,
  },
  caption: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 16,
    color: '#444',
  },
  meta: {
    fontSize: 12,
    color: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bullet: { marginRight: 6 },
  footerWrap: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    paddingTop: 6,
    backgroundColor: 'white',
  },
  footerLine: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderStyle: 'solid',
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#4b5563',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  kpiCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    padding: 8,
    width: '30%',
    marginRight: 10,
    marginBottom: 10,
  },
  kpiTitle: { fontSize: 10, color: '#6b7280' },
  kpiValue: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
});

const Footer = ({ reportId, dateStr }) => (
  <View style={styles.footerWrap} fixed>
    <View style={styles.footerLine} />
    <View style={styles.footerRow}>
      <Text>Global Talent Connections · calidad@globaltalentconnections.net</Text>
      <Text>{dateStr}</Text>
    </View>
    <View style={styles.footerRow}>
      <Text>Confidencial · Uso exclusivo del cliente</Text>
      <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}${reportId ? ` · ID: ${reportId}` : ''}`} />
    </View>
  </View>
);

const ReporteDocumento = ({ titulo, clienteNombre, asistenteNombre, fecha, contenido, allowImages = true, adminTexto, /* adminImagenes */ }) => {
  const actividades = contenido?.actividades || [];
  const goals = contenido?.goals || [];
  const sugerencias = contenido?.sugerencias || [];
  const resumen = contenido?.resumen || contenido?.summary || '';
  const metrics = contenido?.metrics || null;
  const monitoring = contenido?.monitoring || null;
  const support = contenido?.support || null;
  const observaciones = contenido?.observaciones || '';
  const aprobaciones = contenido?.aprobaciones || null; // { adminNombre, fechaAprobacion }

  const estado = contenido?.estado || null;

  const getImageSrc = (img) => img?.preview || img?.url || img?.src || '';

  const displayCliente = clienteNombre || contenido?.cliente?.nombre || contenido?.clienteNombre || '';
  const displayAsistente = asistenteNombre || contenido?.asistente?.nombre || contenido?.asistenteNombre || '';

  let displayFecha = '';
  if (fecha) {
    try {
      const d = new Date(fecha);
      displayFecha = isNaN(d.getTime()) ? String(fecha) : d.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    } catch {
      displayFecha = String(fecha);
    }
  }

  const smallCounts = actividades.length <= 5 && goals.length <= 5 && sugerencias.length <= 6;

  const KPIs = [
    { title: 'Total actividades', value: String(actividades.length) },
    { title: 'Total objetivos', value: String(goals.length) },
    { title: 'Total sugerencias', value: String(sugerencias.length) },
  ];

  const renderKpis = (
    <View style={styles.section}>
      <Text style={styles.title}>Indicadores del reporte</Text>
      <View style={styles.kpiGrid}>
        {KPIs.map((k, i) => (
          <View key={i} style={styles.kpiCard} wrap={false}>
            <Text style={styles.kpiTitle}>{k.title}</Text>
            <Text style={styles.kpiValue}>{k.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderActividades = (
    <View style={styles.section}>
      <Text style={styles.title}>1. Actividades Realizadas</Text>
      {actividades.length === 0 ? (
        <Text style={styles.text}>Sin actividades registradas.</Text>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableRow} wrap={false}>
            <Text style={styles.tableColHeader}>Categoría</Text>
            <Text style={styles.tableColHeader}>Descripción</Text>
          </View>
          {actividades.map((act, i) => (
            <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt} wrap={false}>
              <Text style={styles.tableCol}>{String(act.titulo || act.category || '')}</Text>
              <Text style={styles.tableCol}>{String(act.descripcion || act.description || '')}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderObjetivos = (
    <View style={styles.section}>
      <Text style={styles.title}>2. Objetivos Planificados vs. Cumplidos</Text>
      {goals.length === 0 ? (
        <Text style={styles.text}>Sin objetivos.</Text>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableRow} wrap={false}>
            <Text style={styles.tableColHeader}>Título</Text>
            <Text style={styles.tableColHeader}>Descripción</Text>
          </View>
          {goals.map((g, i) => (
            <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt} wrap={false}>
              <Text style={styles.tableCol}>{String(g.title || g.titulo || '')}</Text>
              <Text style={styles.tableCol}>{String(g.description || g.descripcion || '')}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderSugerencias = (
    <View style={styles.section}>
      <Text style={styles.title}>3. Sugerencias de Mejora</Text>
      {sugerencias.length === 0 ? (
        <Text style={styles.text}>Sin sugerencias.</Text>
      ) : (
        sugerencias.map((s, i) => (
          <Text key={i} style={styles.text} wrap={false}>• {String(s?.texto ?? s ?? '')}</Text>
        ))
      )}
    </View>
  );

  const renderMetricas = null;

  const renderObservaciones = (
    (observaciones && String(observaciones).trim().length > 0) || (adminTexto && String(adminTexto).trim().length > 0) ? (
      <View style={styles.section}>
        <Text style={styles.title}>Notas del Administrador</Text>
        {observaciones ? <Text style={styles.text}>{observaciones}</Text> : null}
        {adminTexto ? <Text style={styles.text}>{adminTexto}</Text> : null}
        {/* Comentado temporalmente: render de imágenes del administrador en PDF */}
        {/* {allowImages && Array.isArray(adminImagenes) && adminImagenes.length > 0 ? (
          <View style={{ marginTop: 8 }}>
            {adminImagenes.map((src, i) => (
              <View key={i}>
                <Image style={styles.image} src={typeof src === 'string' ? src : (src?.preview || src?.url || '')} />
                <Text style={styles.caption}>{`Anexo del administrador ${i + 1}`}</Text>
              </View>
            ))}
          </View>
        ) : null} */}
      </View>
    ) : null
  );

  const renderMonitoreo = (
    monitoring ? (
      <View style={styles.section}>
        <Text style={styles.title}>5. Monitoreo</Text>
        {monitoring.hoursWorked ? (
          <Text style={styles.text}>Horas trabajadas: {monitoring.hoursWorked}</Text>
        ) : null}
        {typeof monitoring.activeDays !== 'undefined' ? (
          <Text style={styles.text}>Días activos: {monitoring.activeDays}</Text>
        ) : null}
        {monitoring.avgDailyWork ? (
          <Text style={styles.text}>Promedio de trabajo diario: {monitoring.avgDailyWork}</Text>
        ) : null}
        {monitoring.hubstaff?.workRating ? (
          <Text style={styles.text}>Calificación Hubstaff: {monitoring.hubstaff.workRating}</Text>
        ) : null}
        {Array.isArray(monitoring.hubstaff?.tasks) && monitoring.hubstaff.tasks.length > 0 ? (
          <View style={{ marginTop: 8 }}>
            <Text style={{ ...styles.text, fontWeight: 'bold' }}>Tareas:</Text>
            {monitoring.hubstaff.tasks.map((t, i) => (
              <Text key={i} style={styles.text}>- {t}</Text>
            ))}
          </View>
        ) : null}
        {Array.isArray(monitoring.hubstaff?.tools) && monitoring.hubstaff.tools.length > 0 ? (
          <View style={{ marginTop: 8 }}>
            <Text style={{ ...styles.text, fontWeight: 'bold' }}>Herramientas:</Text>
            {monitoring.hubstaff.tools.map((tool, i) => (
              <Text key={i} style={styles.text}>- {tool}</Text>
            ))}
          </View>
        ) : null}
      </View>
    ) : null
  );

  const renderSoporte = (
    support ? (
      <View style={styles.section}>
        <Text style={styles.title}>6. Soporte</Text>
        {support.email ? <Text style={styles.text}>Email: {support.email}</Text> : null}
        {support.whatsapp ? <Text style={styles.text}>WhatsApp: {support.whatsapp}</Text> : null}
        {support.hours ? <Text style={styles.text}>Horario: {support.hours}</Text> : null}
      </View>
    ) : null
  );

  const renderAprobaciones = (
    aprobaciones ? (
      <View style={styles.section}>
        <Text style={styles.title}>Aprobaciones</Text>
        <Text style={styles.text}>Administrador: {aprobaciones.adminNombre || '—'}</Text>
        <Text style={styles.text}>Fecha de aprobación: {aprobaciones.fechaAprobacion || '—'}</Text>
      </View>
    ) : null
  );

  const currentDateStr = new Date().toLocaleDateString('es-ES');

  return (
    <Document>
      {/* Portada / Encabezado */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {allowImages ? (
            <Image style={styles.logo} src="https://recursos-gtc.vercel.app/assets/logo-gtc.png" />
          ) : null}
          <Text style={styles.headerText}>Global Talent Connections</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>{titulo || 'Informe'}</Text>
          <Text style={styles.meta}>Cliente: {displayCliente || '—'}</Text>
          <Text style={styles.meta}>Asistente: {displayAsistente || '—'}</Text>
          <Text style={styles.meta}>Fecha: {displayFecha || '—'}</Text>
          {estado ? <Text style={styles.meta}>Estado: {estado}</Text> : null}
        </View>
        {renderKpis}
        {(resumen && String(resumen).trim().length > 0) && (
          <View style={styles.section}>
            <Text style={styles.title}>Resumen Ejecutivo</Text>
            <Text style={styles.text}>{resumen}</Text>
          </View>
        )}
        <Footer reportId={contenido?._id} dateStr={currentDateStr} />
      </Page>

      {/* Página combinada si es pequeño */}
      {smallCounts && (
        <Page size="A4" style={styles.page}>
          {renderActividades}
          {renderObjetivos}
          {renderSugerencias}
          {renderMetricas}
          {renderObservaciones}
          <Footer reportId={contenido?._id} dateStr={currentDateStr} />
        </Page>
      )}
      {!smallCounts && (
        <Page size="A4" style={styles.page}>
          {renderActividades}
          <Footer reportId={contenido?._id} dateStr={currentDateStr} />
        </Page>
      )}
      {!smallCounts && (
        <Page size="A4" style={styles.page}>
          {renderObjetivos}
          <Footer reportId={contenido?._id} dateStr={currentDateStr} />
        </Page>
      )}
      {!smallCounts && (
        <Page size="A4" style={styles.page}>
          {renderSugerencias}
          <Footer reportId={contenido?._id} dateStr={currentDateStr} />
        </Page>
      )}
      {/* renderMetricas deshabilitado */}

      {/* Monitoreo */}
      {renderMonitoreo ? (
        <Page size="A4" style={styles.page}>
          {renderMonitoreo}
          <Footer reportId={contenido?._id} dateStr={currentDateStr} />
        </Page>
      ) : null}

      {/* Soporte + Aprobaciones (intentar agrupar) */}
      {renderSoporte || renderAprobaciones ? (
        <Page size="A4" style={styles.page}>
          {renderSoporte}
          {renderAprobaciones}
          <Footer reportId={contenido?._id} dateStr={currentDateStr} />
        </Page>
      ) : null}
    </Document>
  );
};

export default ReporteDocumento;
