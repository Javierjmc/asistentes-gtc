import React, { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { ElementoDeListaCA } from "../components/administrador/clientes/ElementoDeListaCA";
import { Titulo } from "../components/Titulo";
import { CabeceraDeListaCA } from "../components/administrador/clientes/CabeceraDeListaCA";
import { BusquedaCA } from "../components/administrador/clientes/BusquedaCA";
import { AsignarAsistente } from "../components/administrador/clientes/AsignarAsistente";

export const ClientesAdministrador = () => {
  const [clients, setClients] = useState([]);
  const [asistentes, setAsistentes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClientsAndAsistentes = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Token de autenticación no encontrado.");
      setIsLoading(false);
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [clientsResponse, asistentesResponse] = await Promise.all([
        fetch("http://127.0.0.1:5000/clientes", { headers }),
        fetch("http://127.0.0.1:5000/asistentes", { headers }),
      ]);

      if (!clientsResponse.ok || !asistentesResponse.ok) {
        throw new Error("Error al obtener datos del servidor.");
      }

      const clientsData = await clientsResponse.json();
      const asistentesData = await asistentesResponse.json();

      setClients(clientsData);
      setAsistentes(asistentesData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientsAndAsistentes();
  }, []);

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
    fetchClientsAndAsistentes(); // Refresca la lista después de la asignación
  };

  const filteredClients = clients.filter((client) => {
    const searchTerm = searchQuery.toLowerCase();
    
    // Filtramos por nombre del cliente o nombre del asistente asignado
    const hasMatchingAsistente = client.asistentes_asignados.some(asistente => 
        asistente.nombre.toLowerCase().includes(searchTerm)
    );

    return (
      client.nombre.toLowerCase().includes(searchTerm) || hasMatchingAsistente
    );
  });

  if (isLoading) {
    return (
      <Layout rol="administrador">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
          <Titulo contenido="Cargando Clientes..." />
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout rol="administrador">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
          <Titulo contenido="Error" />
          <p className="text-red-500">{error}</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout rol="administrador">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
        <Titulo contenido="Clientes" />
        <BusquedaCA searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          <CabeceraDeListaCA />
          {filteredClients.length > 0 ? (
            filteredClients.map((cliente) => (
              <ElementoDeListaCA
                key={cliente._id}
                nombre={cliente.nombre}
                asistentes={cliente.asistentes_asignados}
                onAssignAsistente={() => openModal(cliente)}
              />
            ))
          ) : (
            <li className="text-center py-4 text-slate-500">
              No se encontraron clientes.
            </li>
          )}
        </ul>
      </section>
      {isModalOpen && selectedClient && (
        <AsignarAsistente 
          onClose={closeModal} 
          client={selectedClient} 
          asistentesDisponibles={asistentes}
          onRefreshClients={fetchClientsAndAsistentes}
        />
      )}
    </Layout>
  );
};