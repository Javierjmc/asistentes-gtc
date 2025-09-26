import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/logo-gtc.png";

// Helper para obtener la fecha actual con formato
const getCurrentDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('es-ES', options);
};

// 🎨 Estilos inspirados en el informe (azul oscuro/negro, limpio)
const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 70, // espacio para footer
    paddingHorizontal: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    backgroundColor: "#ffffff", // Fondo blanco limpio
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottomWidth: 3, // Borde más grueso
    borderBottomColor: "#003366", // Azul oscuro corporativo
    paddingBottom: 12,
  },
  logo: {
    width: 150,
    height: 75,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "extrabold",
    color: "#003366",
    textAlign: "right",
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 25,
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#f4f7f9",
    borderLeftWidth: 5,
    borderLeftColor: "#0a5275",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 14,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 6,
  },
  text: {
    fontSize: 11,
    marginBottom: 6,
    color: "#444444",
  },
  // Tabla corporativa mejorada
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 15,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowAlt: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#003366",
    padding: 10,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
  },
  tableCol: {
    width: "50%",
    padding: 10,
    borderStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableText: {
    fontSize: 11,
    color: "#333333",
  },
  // Footer elegante y simplificado
  footer: {
    position: "absolute",
    bottom: 20,
    left: 50,
    right: 50,
    borderTopWidth: 2, // Borde más prominente
    borderTopColor: "#003366",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
    flexDirection: 'row',
    justifyContent: 'space-between', // Para alinear logo a la izquierda y texto a la derecha
    alignItems: 'center',
  },
  footerLogo: {
    width: 80,
    height: 40,
    objectFit: "contain",
    opacity: 0.8, 
  },
  footerLine: {
    fontSize: 10,
    color: "#003366", // Texto destacado
    fontWeight: 'bold',
  },
  // Estilos de resumen y período
  summarySection: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a5275",
    marginBottom: 10,
  },
  periodText: {
    fontSize: 12,
    fontWeight: 'extrabold',
    color: '#003366',
    marginBottom: 8,
  },
  // --- INICIO: Nuevo estilo de Contacto ---
  contactSection: {
    marginTop: 30,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f0f8ff", // Fondo muy claro para destacar
    border: '1pt solid #0a5275',
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0a5275",
    marginBottom: 10,
  },
  contactDetail: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 4,
    fontWeight: 'bold',
  },
  // --- FIN: Nuevo estilo de Contacto ---
});

// Componente de Pie de Página reutilizable (SE MANTIENE EL CÓDIGO ORIGINAL SIN PAGINACIÓN)
const FooterComponent = ({ report }) => (
  <View style={styles.footer} fixed>
    <Image
        style={styles.footerLogo}
        src={logo || "https://via.placeholder.com/80x40"}
    />
    {/* SE MANTIENE EL RENDER ORIGINAL SIN PAGINACIÓN */}
    <Text 
      style={styles.footerLine} 
    >
      CALIDAD
    </Text>
  </View>
);

// 📄 Documento dinámico con protecciones
const MyDocument = ({ report = {}, adminTexto = "" }) => (
  <Document>
    {/* Portada / Información General */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src={logo || "https://via.placeholder.com/150x75"}
        />
        <View style={{ textAlign: 'right' }}>
            <Text style={{ fontSize: 12, color: "#6b7280" }}>DEPARTAMENTO DE CALIDAD</Text>
            <Text style={styles.headerText}>{report?.title || "INFORME MENSUAL"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Datos del Reporte</Text>
        <Text style={styles.periodText}>
          PERIODO: {report?.period || "N/A"}
        </Text>
        <Text style={styles.text}>
          Fecha de Entrega: <Text style={{fontWeight: 'bold'}}>{report?.date || getCurrentDate()}</Text>
        </Text>
        <Text style={styles.text}>
          Empresa: <Text style={{fontWeight: 'bold'}}>{report?.company || "N/A"}</Text>
        </Text>
        <Text style={styles.text}>
          Asistente Virtual: <Text style={{fontWeight: 'bold'}}>{report?.assistant || "N/A"}</Text>
        </Text>
        {/* <Text style={styles.text}>
          Departamento: <Text style={{fontWeight: 'bold'}}>{report?.department || "N/A"}</Text>
        </Text> */}
      </View>
      
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Resumen General</Text>
        <Text style={styles.text}>
            {report?.summary || "Marketing Digital y Generación de Leads"}
        </Text>
      </View>

      <FooterComponent report={report} />
    </Page>

    {/* Actividades */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>1. Actividades Realizadas</Text>
        <Text style={styles.text}>Lista detallada de las tareas ejecutadas durante el mes:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Categoría</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Descripción</Text>
            </View>
          </View>
          {report?.activities?.map((act, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <View style={styles.tableCol}>
                <Text style={styles.tableText}>{act?.category || "N/A"}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableText}>
                  {act?.description || "N/A"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <FooterComponent report={report} />
    </Page>

    {/* Objetivos, Sugerencias y Contacto */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>2. Objetivos Planificados vs Cumplidos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Planificado (Establecido)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderText}>Cumplido (Alcanzado)</Text>
            </View>
          </View>
          {report?.objectives?.map((obj, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <View style={styles.tableCol}>
                <Text style={styles.tableText}>{obj?.planned || "N/A"}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableText}>{obj?.achieved || "N/A"}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>3. Sugerencia Técnica</Text>
        {report?.suggestions?.map((sug, i) => (
          <Text key={i} style={styles.text}>
            • {sug}
          </Text>
        ))}
      </View>
      
      {/* --- INICIO: NUEVA SECCIÓN DE CONTACTO (Añadida) --- */}
      <View style={styles.contactSection} wrap={false}>
        <Text style={styles.contactTitle}>
          Contacto de Soporte (GTC - Equipo de Calidad)
        </Text>
        <Text style={styles.text}>
          Ante cualquier incidencia o dificultad durante la integración, puedes contactar directamente
          con el equipo de calidad GTC:
        </Text>
        <Text style={styles.contactDetail}>
          Correo: <Text style={{fontWeight: 'normal'}}>calidad@globaltalentconnections.net</Text>
        </Text>
        <Text style={styles.contactDetail}>
          Canal de soporte: <Text style={{fontWeight: 'normal'}}>+34 622 85 04 23 (Whatsapp)</Text>
        </Text>
        <Text style={styles.contactDetail}>
          Horario de atención: <Text style={{fontWeight: 'normal'}}>lunes a viernes 13:00 pm - 20:00 pm (hora España).</Text>
        </Text>
      </View>
      {/* --- FIN: NUEVA SECCIÓN DE CONTACTO --- */}
      
      <FooterComponent report={report} />
    </Page>

    {/* Observaciones */}
    {adminTexto && (
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Observaciones / Comentarios del Administrador</Text>
          <Text style={styles.text}>{adminTexto}</Text>
        </View>

        <FooterComponent report={report} />
      </Page>
    )}
  </Document>
);

export default MyDocument;