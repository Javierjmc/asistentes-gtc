import { useStore } from "../../../store";

export const FormularioCA = () => {
  const { clientForm, setClientForm, addClient, updateClient, editingClientIndex, setEditingClientIndex } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm({ ...clientForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientForm.nombre && clientForm.empresa) {
      const asistentesArray = clientForm.asistentes.split(',').map(asistente => asistente.trim());
      
      const clientData = {
        nombre: clientForm.nombre,
        empresa: clientForm.empresa,
        asistentes: asistentesArray,
      };

      if (editingClientIndex !== null) {
        // Usa la acción de actualización cuando se edita un cliente
        updateClient(editingClientIndex, clientData);
      } else {
        // Usa la acción de agregar para clientes nuevos
        addClient(clientData);
      }
      
      setClientForm({ nombre: '', empresa: '', asistentes: '' });
      setEditingClientIndex(null);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <fieldset className="border border-slate-400 shadow bg-slate-100 rounded-lg px-2 sm:px-4 py-4 grid sm:grid-cols-2 md:grid-cols-7 gap-2">
        <legend className="font-semibold text-slate-500">
          {editingClientIndex !== null ? "Editar Cliente" : "Nuevo Cliente"}
        </legend>
        <input
          type="text"
          name="nombre"
          value={clientForm.nombre}
          onChange={handleChange}
          className="p-2 bg-slate-300 rounded-md shadow md:col-span-2 outline-none"
          placeholder="Ingrese nombre"
        />
        <input
          type="text"
          name="empresa"
          value={clientForm.empresa}
          onChange={handleChange}
          className="p-2 bg-slate-300 rounded-md shadow md:col-span-2 outline-none"
          placeholder="Ingrese empresa"
        />
        <input
          type="text"
          name="asistentes"
          value={clientForm.asistentes}
          onChange={handleChange}
          className="p-2 bg-slate-300 rounded-md shadow md:col-span-2 outline-none"
          placeholder="Ingrese asistentes (separados por coma)"
        />
        <button type="submit" className="bg-cyan-600 text-white py-2 rounded-md cursor-pointer">
          {editingClientIndex !== null ? "Guardar Cambios" : "Añadir"}
        </button>
      </fieldset>
    </form>
  );
};