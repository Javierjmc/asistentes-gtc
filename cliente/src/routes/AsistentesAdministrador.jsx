import { Layout } from "../layout/Layout";
import { Titulo } from "../components/Titulo";
import { useStore } from "../store";
import { FormularioAA } from "../components/administrador/asistentes/FormularioAA";
import { CabeceraDeListaAA } from "../components/administrador/asistentes/CabeceraDeListaAA";
import { ElementoDeListaAA } from "../components/administrador/asistentes/ElementoDeListaAA";

export const AsistentesAdministrador = () => {
  const { asistentes } = useStore();

  return (
    <Layout rol="administrador">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
        <Titulo contenido="Asistentes"/>
        <FormularioAA />
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          <CabeceraDeListaAA />
          {asistentes.map((asistente, index) => (
            <ElementoDeListaAA
              key={index}
              nombre={asistente.nombre} 
              empresa={asistente.empresa}
              email={asistente.email}
              index={index}
            />
          ))}
        </ul>
      </section>
    </Layout>
  );
};