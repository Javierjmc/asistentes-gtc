import { useEffect, useState } from 'react';
import axios from 'axios';

function ListaDeInformes() {
  const [informes, setInformes] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    // La URL debe coincidir con la dirección de tu servidor de Flask
    axios.get(API_BASE_URL+'/datos')
      .then(response => {
        setInformes(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los informes:', error);
      });
  }, []); // El array vacío asegura que se ejecute solo una vez al cargar el componente

  return (
    <div>
      <h2>Informes</h2>
      {informes.length > 0 ? (
        <ul>
          {informes.map(informe => (
            <li key={informe._id}>
              <p>Nombre: {informe.nombre}</p>
              <p>Descripción: {informe.descripcion}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay informes para mostrar. ¡Crea uno!</p>
      )}
    </div>
  );
}

export default ListaDeInformes;