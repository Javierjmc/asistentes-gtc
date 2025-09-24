import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument'; // ✅ cambia el import

const PDFReport = ({ reporte, adminTexto }) => {
  const hasData = Boolean(reporte && reporte.titulo);

  console.log('reporte desde PDFReport', reporte);
  console.log('adminTexto desde PDFReport', adminTexto);

  // Adaptador simple para convertir tu reporte en el formato esperado por MyDocument
  const mapReporteToReport = (reporte) => ({
    company: "Mi Empresa",
    title: reporte.titulo,
    assistant: reporte.asistente?.nombre,
    department: "Ventas",
    date: reporte.fecha_creacion,
    period: "Semana actual",
    summary: "Resumen automático del reporte.",
    activities: (reporte.contenido?.actividades || []).map((a) => ({
      category: "General", // si no tienes categoría
      description: a.texto || "",
    })),
    objectives: (reporte.contenido?.goals || []).map((g) => ({
      planned: g.planificado || "",
      achieved: g.cumplido || "",
    })),
    suggestions: (reporte.contenido?.sugerencias || []).map((s) => s.texto || ""),
    monitoring: {
      hoursWorked: "No disponible",
      activeDays: "No disponible",
      avgDailyWork: "No disponible",
      hubstaff: {
        workRating: "No disponible",
        tasks: [],
        tools: [],
      },
    },
    support: {
      email: "soporte@miempresa.com",
      whatsapp: "+58 000-0000000",
      hours: "Lunes a Viernes, 9am - 6pm",
    },
  });

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      {hasData ? (
        <MyDocument
        report={mapReporteToReport(reporte)}
        adminTexto={adminTexto || reporte.admin_texto}
        />
      ) : (
        <MyDocument
          report={{
            company: "Mi Empresa",
            title: "Reporte vacío",
            assistant: "",
            department: "",
            date: "",
            period: "",
            summary: "No hay datos disponibles.",
            activities: [],
            objectives: [],
            suggestions: [],
            monitoring: {
              hoursWorked: "",
              activeDays: "",
              avgDailyWork: "",
              hubstaff: { workRating: "", tasks: [], tools: [] },
            },
            support: { email: "", whatsapp: "", hours: "" },
          }}
          adminTexto=""
        />
      )}
    </PDFViewer>
  );
};

export default PDFReport;
