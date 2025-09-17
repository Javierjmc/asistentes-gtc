import { Layout } from "../layout/Layout";
import { ElementoDeListaCA } from "../components/administrador/clientes/ElementoDeListaCA";
import { Titulo } from "../components/Titulo";
import { FormularioCA } from "../components/administrador/clientes/FormularioCA";
import { CabeceraDeListaCA } from "../components/administrador/clientes/CabeceraDeListaCA";
import { BusquedaCA } from "../components/administrador/clientes/BusquedaCA";
import { useStore } from "../store";

export const ClientesAdministrador = () => {
  const { clients, asistentes, searchQuery } = useStore();

  const filteredClients = clients.filter(client => {
    const searchTerm = searchQuery.toLowerCase();
    
    // Obtener los asistentes de este cliente para la búsqueda
    const clientAsistentes = asistentes.filter(a => a.empresa.toLowerCase() === client.empresa.toLowerCase());
    const asistentesString = clientAsistentes.map(a => a.nombre).join(' ').toLowerCase();

    return (
      client.nombre.toLowerCase().includes(searchTerm) ||
      client.empresa.toLowerCase().includes(searchTerm) ||
      asistentesString.includes(searchTerm)
    );
  });

  return (
    <Layout rol="administrador">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
        <Titulo contenido="Clientes"/>
        <FormularioCA />
        <BusquedaCA />
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          <CabeceraDeListaCA />
          {filteredClients.map((cliente, index) => {
            // Se filtran los asistentes para este cliente en particular
            const clientAsistentes = asistentes.filter(asistente => asistente.empresa.toLowerCase() === cliente.empresa.toLowerCase());
            return (
              <ElementoDeListaCA
                key={index}
                nombre={cliente.nombre} 
                empresa={cliente.empresa}
                asistentes={clientAsistentes.map(a => a.nombre)} // Se envían solo los nombres al componente de la lista
                index={index}
              />
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};