import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../auth/AuthContext";
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const Acceder = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("cliente"); // Nuevo estado para el rol
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";
    const body = isLogin
      ? { email, password }
      : { nombre, email, password, role: userRole }; // Se añade el rol al body

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        if (isLogin) {
          const data = await response.json();
          login(data.access_token);
          const { role } = jwtDecode(data.access_token);
          if (role === "administrador") {
            navigate("/clientes-administrador");
          } else if (role === "asistente") {
            navigate("/seleccionar-cliente");
          } else if (role === "cliente") {
            navigate("/cliente");
          }
        } else {
          alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
          setIsLogin(true);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.msg || "Error en la autenticación.");
      }
    } catch (error) {
      console.error("Error de red o del servidor:", error);
      alert("Ocurrió un error. Intenta de nuevo.");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-t from-blue-950 to-blue-800 flex justify-center items-center">
      <section className="w-[315px] sm:w-[350px] rounded-lg overflow-hidden shadow-md bg-slate-900">
        <div className="py-12 flex flex-col gap-6 items-center">
          <img
            src={logo}
            alt="Logo de Global Talent Connections"
            className="w-62 opacity-70"
          />
        </div>
        <form
          className="flex flex-col gap-6 py-6 px-4 sm:px-6 rounded-t-md overflow-hidden bg-slate-400"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <>
              <fieldset className="flex flex-col">
                <label htmlFor="nombre" className="font-semibold text-slate-800">
                  Ingrese Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Indique su nombre"
                  className="bg-slate-500/50 py-3 px-2 rounded outline-none shadow"
                  required={!isLogin}
                />
              </fieldset>
              <fieldset className="flex flex-col">
                <label htmlFor="role" className="font-semibold text-slate-800">
                  Seleccione su Rol
                </label>
                <select
                  id="role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="bg-slate-500/50 py-3 px-2 rounded outline-none shadow"
                >
                  <option value="cliente">Cliente</option>
                  <option value="asistente">Asistente</option>
                </select>
              </fieldset>
            </>
          )}
          <fieldset className="flex flex-col">
            <label htmlFor="correo" className="font-semibold text-slate-800">
              Ingrese Correo
            </label>
            <input
              id="correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Indique su correo"
              className="bg-slate-500/50 py-3 px-2 rounded outline-none shadow"
              required
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-slate-800">
              Ingrese Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="bg-slate-500/50 py-3 px-2 rounded outline-none shadow"
              required
            />
          </fieldset>
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white text-center font-semibold rounded py-3 shadow-md transition-all duration-300 ease-in-out transform cursor-pointer"
          >
            {isLogin ? "Acceder" : "Registrarse"}
          </button>
        </form>
        <div className="py-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white underline"
          >
            {isLogin ? "¿No tienes cuenta? Regístrate aquí." : "¿Ya tienes cuenta? Inicia sesión aquí."}
          </button>
        </div>
      </section>
    </main>
  );
};