import React, { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { Titulo } from "../components/Titulo";
import { CabeceraDeListaAA } from "../components/administrador/asistentes/CabeceraDeListaAA";
import { ElementoDeListaAA } from "../components/administrador/asistentes/ElementoDeListaAA";
import { BusquedaAA } from "../components/administrador/asistentes/BusquedaAA";

export const AsistentesAdministrador = () => {
  const [asistentes, setAsistentes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAsistentes = async () => {
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

      const response = await fetch("http://127.0.0.1:5000/asistentes", { headers });

      if (!response.ok) {
        throw new Error("Error al obtener datos del servidor.");
      }

      const asistentesData = await response.json();
      setAsistentes(asistentesData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAsistentes();
  }, []);

  const filteredAsistentes = asistentes.filter((asistente) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      asistente.nombre.toLowerCase().includes(searchTerm) ||
      asistente.email.toLowerCase().includes(searchTerm)
    );
  });

  if (isLoading) {
    return (
      <Layout rol="administrador">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
          <Titulo contenido="Cargando Asistentes..." />
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
        <Titulo contenido="Asistentes" />
        <BusquedaAA searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          <CabeceraDeListaAA />
          {filteredAsistentes.length > 0 ? (
            filteredAsistentes.map((asistente, index) => (
              <ElementoDeListaAA
                key={index}
                nombre={asistente.nombre}
                email={asistente.email}
              />
            ))
          ) : (
            <li className="text-center py-4 text-slate-500">
              No se encontraron asistentes.
            </li>
          )}
        </ul>
      </section>
    </Layout>
  );
};