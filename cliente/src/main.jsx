import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
// Polyfill para Buffer en el navegador (necesario para @react-pdf en algunos entornos)
import { Buffer } from "buffer";
import process from "process";
if (!window.Buffer) window.Buffer = Buffer;
if (!window.process) window.process = process;

// Importa los componentes de autenticación
import { AuthProvider, AuthContext } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// Importa tus componentes de ruta
import { FormularioExteriorAsistente } from "./routes/FormularioExteriorAsistente";
import { InformesAsistente } from "./routes/InformesAsistente";
import { TableroCliente } from "./routes/TableroCliente";
import { Acceder } from "./routes/Acceder";
import { ClientesAdministrador } from "./routes/ClientesAdministrador";
import { AsistentesAdministrador } from "./routes/AsistentesAdministrador";
import { InformesAdministrador } from "./routes/InformesAdministrador";
import { Vista } from "./routes/Vista";
import ListaDeInformes from "./routes/ListaDeInformes";
import { ReporteDetalleAdmin } from "./routes/ReporteDetalleAdmin";
import { SeleccionClienteAsistente } from "./routes/SeleccionClienteAsistente";
import PDFReport from "./components/pdf/PDFReport";

const AccessDenied = () => (
  <h2>Acceso Denegado. No tienes permisos para ver esta página.</h2>
);

// Componente para manejar el estado de carga y las rutas
const AppContent = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {/* Ruta pública para acceder */}
      <Route path="/" element={<Acceder />} />
      <Route path="/ruta-de-prueba" element={<PDFReport />} />

      {/* Rutas Protegidas */}
      <Route
        path="/clientes-administrador"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <ClientesAdministrador />
          </ProtectedRoute>
        }
      />
      <Route
        path="/asistentes-administrador"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <AsistentesAdministrador />
          </ProtectedRoute>
        }
      />
      <Route
        path="/informes-administrador"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <InformesAdministrador />
          </ProtectedRoute>
        }
      />
      {/* Nueva ruta para que el asistente seleccione al cliente */}
      <Route
        path="/seleccionar-cliente"
        element={
          <ProtectedRoute allowedRoles={["asistente"]}>
            <SeleccionClienteAsistente />
          </ProtectedRoute>
        }
      />
      {/* Ruta del formulario que recibe el clienteId */}
      <Route
        path="/formulario-asistente/:clienteId"
        element={
          <ProtectedRoute allowedRoles={["asistente"]}>
            <FormularioExteriorAsistente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/informes-asistente"
        element={
          <ProtectedRoute allowedRoles={["asistente", "administrador"]}>
            <InformesAsistente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente"
        element={
          <ProtectedRoute allowedRoles={["cliente", "administrador"]}>
            <TableroCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente-pdf"
        element={
          <ProtectedRoute allowedRoles={["cliente", "administrador"]}>
            <Vista />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lista"
        element={
          <ProtectedRoute allowedRoles={["cliente", "administrador"]}>
            <ListaDeInformes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportes-administrador/:reporteId"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <ReporteDetalleAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="/acceso-denegado" element={<AccessDenied />} />
    </Routes>
  );
};

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
);