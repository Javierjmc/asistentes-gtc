import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Tablero } from "./routes/Tablero";
import { FormularioExterior } from "./routes/FormularioExterior";
import { Informes } from "./routes/Informes";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tablero />} />
      <Route path="/formulario" element={<FormularioExterior />} />
      <Route path="/informes" element={<Informes />} />
    </Routes>
  </BrowserRouter>
);
