import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { FormularioExteriorAsistente } from "./routes/FormularioExteriorAsistente";
import { InformesAsistente } from "./routes/InformesAsistente";
import { TableroCliente } from "./routes/TableroCliente";
import { TableroAsistente } from "./routes/TableroAsistente";
import { Acceder } from "./routes/Acceder";
import { ClientesAdministrador } from "./routes/ClientesAdministrador"
import { AsistentesAdministrador } from "./routes/AsistentesAdministrador"
import { InformesAdministrador } from "./routes/InformesAdministrador"
import { Vista } from "./routes/Vista";
import ListaDeInformes from "./routes/ListaDeInformes";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Acceder />} />

      <Route path="/lista" element={<ListaDeInformes />} />


      
      {/* rutas de perfil de administrador*/}
      <Route path="/clientes-administrador" element={<ClientesAdministrador />} />
      <Route path="/asistentes-administrador" element={<AsistentesAdministrador />} />
      <Route path="/informes-administrador" element={<InformesAdministrador />} />
      
      {/* rutas de perfil de asistente */}
      {/* <Route path="/tablero-asistente" element={<TableroAsistente />} /> */}
      <Route path="/formulario-asistente" element={<FormularioExteriorAsistente />} />
      <Route path="/informes-asistente" element={<InformesAsistente />} />

      {/* ruta de perfil de cliente, aqui deben llegar los infomes luego de que sean chequeados por los asistentes*/}
      <Route path="/cliente" element={<TableroCliente />} />
      <Route path="/cliente-pdf" element={<Vista />} />

    </Routes>
  </BrowserRouter>
);
