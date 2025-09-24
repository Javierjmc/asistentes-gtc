import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { CintaSuperiorLogo } from "../components/CintaSuperiorLogo";
import { Nav } from "./Nav";

export const Header = ({ navegacion, rol, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  
  return (
    <header>
      <CintaSuperiorLogo />
      <div className="bg-slate-300 flex justify-between px-[2px] sm:px-4 md:px-20 py-4 shadow">
        <div className="flex flex-col items-center text-slate-800">
          <h1 className="sm:text-2xl font-bold">{rol}</h1>
          <p className="opacity-60 font-semibold">{localStorage.getItem('access_token') ? (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).nombre || 'Usuario') : 'Usuario'}</p>
        </div>
        <Nav navegacion={navegacion} onLogout={handleLogout} />
      </div>
    </header>
  );
};