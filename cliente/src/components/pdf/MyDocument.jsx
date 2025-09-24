import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// 🎨 Estilos profesionales
const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
    borderBottomWidth: 2,
    borderBottomColor: "#007c91",
    paddingBottom: 12,
  },
  logo: {
    width: 130,
    height: 65,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007c91",
  },
  section: {
    marginBottom: 30,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005f73",
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 4,
  },
  text: {
    fontSize: 11,
    marginBottom: 6,
    color: "#333",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 12,
    borderSpacing: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowAlt: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    backgroundColor: "#007c91",
    padding: 6,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    padding: 6,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#007c91",
    marginTop: 8,
    marginBottom: 4,
  },
});

// 📄 Documento dinámico
const MyDocument = ({ report, adminTexto }) => (
  <Document>
    {/* Portada */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src="https://recursos-gtc.vercel.app/assets/logo-gtc.png"
        />
        <Text style={styles.headerText}>{report.company}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.text}>Asistente: {report.assistant}</Text>
        <Text style={styles.text}>Departamento: {report.department}</Text>
        <Text style={styles.text}>Fecha: {report.date}</Text>
        <Text style={styles.text}>Periodo: {report.period}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Resumen Ejecutivo</Text>
        <Text style={styles.text}>{report.summary}</Text>
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `CALIDAD | Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* Actividades */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>1. Actividades Realizadas</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Categoría</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Descripción</Text>
            </View>
          </View>
          {report.activities.map((act, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <View style={styles.tableCol}>
                <Text>{act.category}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{act.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `CALIDAD | Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* Objetivos */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>2. Objetivos Planificados vs Cumplidos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Planificado</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Cumplido</Text>
            </View>
          </View>
          {report.objectives.map((obj, i) => (
            <View
              key={i}
              style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <View style={styles.tableCol}>
                <Text>{obj.planned}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{obj.achieved}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `CALIDAD | Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* Sugerencias */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>3. Sugerencias de Mejora</Text>
        {report.suggestions.map((sug, i) => (
          <Text key={i} style={styles.text}>
            {sug}
          </Text>
        ))}
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `CALIDAD | Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* Monitoreo */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>4. Monitoreo</Text>
        <Text style={styles.text}>
          Horas trabajadas: {report.monitoring.hoursWorked}
        </Text>
        <Text style={styles.text}>
          Días activos: {report.monitoring.activeDays}
        </Text>
        <Text style={styles.text}>
          Promedio de trabajo diario: {report.monitoring.avgDailyWork}
        </Text>
        <Text style={styles.text}>
          Calificación Hubstaff: {report.monitoring.hubstaff.workRating}
        </Text>

        <Text style={styles.subtitle}>Tareas</Text>
        {report.monitoring.hubstaff.tasks.map((t, i) => (
          <Text key={i} style={styles.text}>
            - {t}
          </Text>
        ))}

        <Text style={styles.subtitle}>Herramientas</Text>
        {report.monitoring.hubstaff.tools.map((tool, i) => (
          <Text key={i} style={styles.text}>
            - {tool}
          </Text>
        ))}
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `CALIDAD | Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* Soporte */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>5. Soporte</Text>
        <Text style={styles.text}>Email: {report.support.email}</Text>
        <Text style={styles.text}>WhatsApp: {report.support.whatsapp}</Text>
        <Text style={styles.text}>Horario: {report.support.hours}</Text>
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `CALIDAD | Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* Observaciones del administrador */}
    {adminTexto && (
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Observaciones del Administrador</Text>
          <Text style={styles.text}>{adminTexto}</Text>
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `CALIDAD | Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    )}
  </Document>
);

export default MyDocument;
