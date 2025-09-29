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

const getCurrentDate = () => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date().toLocaleDateString("es-ES", options);
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottomWidth: 3,
    borderBottomColor: "#003366",
    paddingBottom: 12,
  },
  logo: {
    width: 150,
    height: 75,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
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
    textAlign: "justify",
  },
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
  tableColHeaderNarrow: {
    width: "30%",
    backgroundColor: "#003366",
    padding: 10,
  },
  tableColHeaderWide: {
    width: "70%",
    backgroundColor: "#003366",
    padding: 10,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
  },
  tableColNarrow: {
    width: "30%",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableColWide: {
    width: "70%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableText: {
    fontSize: 11,
    color: "#333333",
    wordBreak: "break-word",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 50,
    right: 50,
    borderTopWidth: 2,
    borderTopColor: "#003366",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLogo: {
    width: 80,
    height: 40,
    objectFit: "contain",
    opacity: 0.8,
  },
  footerLine: {
    fontSize: 10,
    color: "#003366",
    fontWeight: "bold",
  },
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
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
  },
  contactSection: {
    marginTop: 30,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f0f8ff",
    border: "1pt solid #0a5275",
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
    fontWeight: "bold",
  },
  // --- ESTILOS UNIFICADOS PARA TODAS LAS IMÁGENES ---
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centra la cuadrícula de imágenes
    marginTop: 15,
  },
  imageWrapper: {
    width: "48%", // Permite dos imágenes por fila
    padding: 5,
    marginBottom: 10,
    // Eliminamos 'alignItems' aquí ya que justifyContent en imageGrid se encarga del centrado del grupo.
  },
  smallImage: {
    width: "100%", // La imagen ocupa todo el contenedor (48% de la página)
    height: 180, // Altura fija para consistencia
    objectFit: 'contain', // Asegura que la imagen completa se vea
  },
  // --- FIN ESTILOS UNIFICADOS ---
});

const FooterComponent = ({ report }) => (
  <View style={styles.footer} fixed>
    <Image
      style={styles.footerLogo}
      src={logo || "https://via.placeholder.com/80x40"}
    />
    <Text style={styles.footerLine}>CALIDAD</Text>
  </View>
);

const MyDocument = ({ report = {} }) => (
  <Document>
    {/* PÁGINA 1: PORTADA / DATOS GENERALES */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src={logo || "https://via.placeholder.com/150x75"}
        />
        <View style={{ textAlign: "right" }}>
          <Text style={{ fontSize: 12, color: "#6b7280" }}>
            DEPARTAMENTO DE CALIDAD
          </Text>
          <Text style={styles.headerText}>
            Reporte Mensual Septiembre {report.texto}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Datos del Reporte</Text>
        <Text style={styles.periodText}>
          PERIODO: {report?.period || "N/A"}
        </Text>
        <Text style={styles.text}>
          Fecha de Entrega:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {report?.date
              ? report?.date.substring(0, 10)
              : getCurrentDate()}
          </Text>
        </Text>
        <Text style={styles.text}>
          Empresa:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {report?.company || "N/A"}
          </Text>
        </Text>
        <Text style={styles.text}>
          Asistente Virtual:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {report?.assistant || "N/A"}
          </Text>
        </Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Resumen General</Text>
        <Text style={[styles.text, { textAlign: "justify" }]}>
          {report?.summary || "Marketing Digital y Generación de Leads"}
        </Text>
      </View>

      <FooterComponent report={report} />
    </Page>

    {/* PÁGINA 2: ACTIVIDADES */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section} wrap={false}>
        <Text style={styles.title}>1. Actividades Realizadas</Text>
        <Text style={styles.text}>
          Lista detallada de las tareas ejecutadas durante el mes:
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeaderNarrow}>
            <Text style={styles.tableHeaderText}>Categoría</Text>
          </View>
          <View style={styles.tableColHeaderWide}>
            <Text style={styles.tableHeaderText}>Descripción</Text>
          </View>
        </View>
        {report?.activities?.map((act, i) => (
          <View
            key={i}
            style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
          >
            <View style={styles.tableColNarrow}>
              <Text style={styles.tableText}>{act?.category || "N/A"}</Text>
            </View>
            <View style={styles.tableColWide}>
              <Text style={styles.tableText}>
                {act?.description || "N/A"}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <FooterComponent report={report} />
    </Page>

    {/* PÁGINA 3: MÉTRICAS (Imágenes del Asistente - PEQUEÑAS Y CENTRADAS) */}
    {
      report?.metricas && report.metricas.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section} wrap={false}>
            <Text style={styles.title}>2. Métricas (Información del Asistente)</Text>
          </View>

          {/* Aplicación del estilo de cuadrícula para las métricas */}
          <View style={styles.imageGrid} wrap>
            {report?.metricas?.map((imagen, i) => (
              <View key={i} style={styles.imageWrapper}>
                <Image src={imagen.url} style={styles.smallImage} />
              </View>
            ))}
          </View>

          <FooterComponent report={report} />
        </Page>
      )
    }

    {/* PÁGINA 4: OBJETIVOS Y SUGERENCIAS */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section} wrap={false}>
        <Text style={styles.title}>3. Objetivos Planificados vs Cumplidos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow} fixed>
            <View style={styles.tableColHeaderNarrow}>
              <Text style={styles.tableHeaderText}>Planificado</Text>
            </View>
            <View style={styles.tableColHeaderWide}>
              <Text style={styles.tableHeaderText}>Cumplido</Text>
            </View>
          </View>
          {report?.objectives?.map((obj, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <View style={styles.tableColNarrow}>
                <Text style={styles.tableText}>
                  {obj?.planned || "N/A"}
                </Text>
              </View>
              <View style={styles.tableColWide}>
                <Text style={styles.tableText}>
                  {obj?.achieved || "N/A"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.title}>4. Sugerencia Técnica</Text>
        {report?.suggestions?.map((sug, i) => (
          <Text key={i} style={styles.text}>
            • {sug}
          </Text>
        ))}
      </View>

      <FooterComponent report={report} />
    </Page>

    {/* PÁGINA 5: OBSERVACIONES Y MONITOREO (admin_texto y admin_imagenes) */}
    {
      (report.admin_texto || (report?.admin_imagenes && report.admin_imagenes.length > 0)) && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section} wrap={false}>
            <Text style={styles.title}>5. Observaciones y Monitoreo</Text>
          </View>

          {/* Observaciones (admin_texto) */}
          {report.admin_texto && (
            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 13, color: "#003366", marginBottom: 8 }]}>
                Observaciones del Administrador:
              </Text>
              <Text style={[styles.text, { textAlign: "justify" }]}>
                {report.admin_texto}
              </Text>
            </View>
          )}

          {/* Monitoreo (admin_imagenes - Múltiples por fila, PEQUEÑAS Y CENTRADAS) */}
          {report?.admin_imagenes?.length > 0 && (
            <View style={styles.imageGrid} wrap>
              {report.admin_imagenes.map((imagen, i) => (
                <View key={i} style={styles.imageWrapper}>
                  <Image src={imagen} style={styles.smallImage} />
                </View>
              ))}
            </View>
          )}

          <FooterComponent report={report} />
        </Page>
      )
    }


    {/* PÁGINA FINAL: CONTACTO DE SOPORTE */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contactSection} wrap={false}>
        <Text style={styles.contactTitle}>
          Contacto de Soporte (GTC - Equipo de Calidad)
        </Text>
        <Text style={[styles.text, { textAlign: "justify" }]}>
          Ante cualquier incidencia o dificultad durante la integración,
          puedes contactar directamente con el equipo de calidad GTC:
        </Text>
        <Text style={styles.contactDetail}>
          Correo:{" "}
          <Text style={{ fontWeight: "normal" }}>
            calidad@globaltalentconnections.net
          </Text>
        </Text>
        <Text style={styles.contactDetail}>
          Canal de soporte:{" "}
          <Text style={{ fontWeight: "normal" }}>
            +34 622 85 04 23 (Whatsapp)
          </Text>
        </Text>
        <Text style={styles.contactDetail}>
          Horario de atención:{" "}
          <Text style={{ fontWeight: "normal" }}>
            lunes a viernes 13:00 pm - 20:00 pm (hora España).
          </Text>
        </Text>
      </View>
      
      <FooterComponent report={report} />
    </Page>
  </Document>
);

export default MyDocument;