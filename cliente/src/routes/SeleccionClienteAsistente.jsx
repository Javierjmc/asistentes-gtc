import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Titulo } from "../components/Titulo";
import { UserIcon } from "@heroicons/react/24/outline";

export const SeleccionClienteAsistente = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("Token de autenticación no encontrado.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_BASE_URL+"/asistente/mis-clientes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la lista de clientes.");
        }

        const clientsData = await response.json();
        setClients(clientsData); // Se establece directamente la lista, sin filtrar
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []); // El array de dependencias está vacío porque no necesitamos re-ejecutarlo

  if (isLoading) {
    return (
      <Layout rol="asistente">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
          <Titulo contenido="Cargando Clientes..." />
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout rol="asistente">
        <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
          <Titulo contenido="Error" />
          <p className="text-red-500">{error}</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout rol="asistente">
      <section className="bg-slate-300 py-6 px-2 sm:px-6 sm:rounded-lg grid gap-2">
        <Titulo contenido="Seleccionar Cliente para el Reporte" />
        <ul className="rounded-lg overflow-hidden shadow border border-slate-400">
          {clients.length > 0 ? (
            clients.map((cliente) => (
              <li
                key={cliente._id}
                className="grid grid-cols-3 bg-slate-100 text-slate-800 border-t border-slate-400 hover:bg-slate-200 transition-colors duration-150"
              >
                <span className="text-center py-4 col-span-2">
                  {cliente.nombre} - {cliente.empresa}
                </span>
                <Link
                  to={`/formulario-asistente/${cliente._id}`}
                  className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  Seleccionar
                </Link>
              </li>
            ))
          ) : (
            <li className="text-center py-4 text-slate-500">
              No tienes clientes asignados.
            </li>
          )}
        </ul>
      </section>
    </Layout>
  );
};