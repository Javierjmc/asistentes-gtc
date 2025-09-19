import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// 🎨 Estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: "#005f73",
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    height: 60,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#005f73",
  },
  section: { marginBottom: 25 },
  title: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#0a9396",
    textTransform: "uppercase",
    borderBottom: "1 solid #ccc",
    paddingBottom: 4,
  },
  text: { fontSize: 11, marginBottom: 6 },
  table: { display: "table", width: "auto", marginBottom: 12 },
  tableRow: { flexDirection: "row" },
  tableRowAlt: { flexDirection: "row", backgroundColor: "#fafafa" },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#005f73",
    padding: 6,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    objectFit: "cover",
    borderRadius: 6,
  },
  caption: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 16,
    color: "#444",
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
});

// 📊 Data de prueba
const report = {
  title: "Informe Mensual Marketing",
  company: "Global Talent Connections",
  assistant: "Gabriel Peña",
  department: "Marketing Digital",
  date: "2025-07-30",
  period: "Julio 2025",
  summary:
    "Durante este mes se avanzó significativamente en campañas digitales, generando leads de calidad y mejorando la presencia en redes sociales.",
  activities: [
    {
      category: "Documentación y protocolos",
      description: "Actualización de manuales de SEO para nuevas campañas.",
    },
    {
      category: "Diseño y comunicación",
      description: "Creación de 12 piezas gráficas para redes sociales.",
    },
    {
      category: "Escritura y Diseño Web",
      description:
        "Publicación de 4 artículos en el blog corporativo y revisión de métricas.",
    },
    {
      category: "Marketing",
      description: "Optimización de la campaña de Google Ads.",
    },
    {
      category: "Estudio y Análisis",
      description:
        "Informe de tendencias de búsqueda en Pinterest y Google Trends.",
    },
  ],
  objectives: [
    {
      planned: "Lanzar la campaña de cocinas",
      achieved: "Campaña publicada con +1500 clics en el primer mes.",
    },
    {
      planned: "Incrementar contenido en redes",
      achieved: "Se alcanzaron +2,000 seguidores nuevos en Instagram.",
    },
    {
      planned: "Preparar campaña de baños (fase 2)",
      achieved: "Se completó el 80% del contenido, listo para agosto.",
    },
  ],
  suggestions: [
    "Optimizar títulos y meta descripciones en artículos de blog para mejorar el CTR orgánico. Esto permitirá que más usuarios encuentren los contenidos de manera natural en buscadores.",
    "Incrementar el uso de reels en Instagram y colaboraciones externas, con el objetivo de ampliar el alcance de la marca en audiencias jóvenes."
  ],
  metrics: {
    website: {
      title: "Rendimiento del sitio web",
      image: "https://via.placeholder.com/600x300.png?text=Website+Stats",
    },
    social: {
      title: "Crecimiento en redes sociales",
      image: "https://via.placeholder.com/600x300.png?text=Social+Media+Stats",
    },
  },
  monitoring: {
    hoursWorked: "162 hrs con 30 mins",
    activeDays: 19,
    avgDailyWork: "8:13 h",
    hubstaff: {
      workRating: "100%",
      tasks: [
        "Crear contenido para redes sociales",
        "Redacción de artículos de blog",
        "Diseño de material gráfico",
      ],
      tools: ["Opera GX Browser", "Google Docs"],
    },
  },
  support: {
    email: "calidad@globaltalentconnections.net",
    whatsapp: "+34 622 85 04 23",
    hours: "Lunes a Viernes 13:00 - 20:00 (España)",
  },
};

// 📄 Documento
const MyDocument = () => (
  <Document>
    {/* Portada */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="https://recursos-gtc.vercel.app/assets/logo-gtc.png" />
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

    {/* Métricas */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>4. Métricas</Text>
        <Image style={styles.image} src={report.metrics.website.image} />
        <Text style={styles.caption}>Rendimiento del sitio web</Text>
        <Image style={styles.image} src={report.metrics.social.image} />
        <Text style={styles.caption}>Crecimiento en redes sociales</Text>
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
        <Text style={styles.title}>5. Monitoreo</Text>
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
        <Text style={{ marginTop: 8, fontWeight: "bold" }}>Tareas:</Text>
        {report.monitoring.hubstaff.tasks.map((t, i) => (
          <Text key={i} style={styles.text}>
            - {t}
          </Text>
        ))}
        <Text style={{ marginTop: 8, fontWeight: "bold" }}>Herramientas:</Text>
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
        <Text style={styles.title}>6. Soporte</Text>
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
  </Document>
);

export default MyDocument;
