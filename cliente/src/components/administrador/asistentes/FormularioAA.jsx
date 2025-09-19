import { useStore } from "../../../store";

export const FormularioAA = () => {
  const { asistenteForm, setAsistenteForm, addAsistente, updateAsistente, editingAsistenteIndex, setEditingAsistenteIndex } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsistenteForm({ ...asistenteForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (asistenteForm.nombre && asistenteForm.email) {
      if (editingAsistenteIndex !== null) {
        updateAsistente(editingAsistenteIndex, asistenteForm);
      } else {
        addAsistente(asistenteForm);
      }
      setAsistenteForm({ nombre: '', empresa: '', email: '' });
      setEditingAsistenteIndex(null);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <fieldset className="border border-slate-400 shadow bg-slate-100 rounded-lg px-2 sm:px-4 py-4 grid sm:grid-cols-2 md:grid-cols-7 gap-2">
        <legend className="font-semibold text-slate-500">
          {editingAsistenteIndex !== null ? "Editar Asistente" : "Nuevo Asistente"}
        </legend>
        <input
          type="text"
          name="nombre"
          value={asistenteForm.nombre}
          onChange={handleChange}
          className="p-2 bg-slate-300 rounded-md shadow md:col-span-2 outline-none"
          placeholder="Nombre del asistente"
        />
        <input
          type="text"
          name="empresa"
          value={asistenteForm.empresa}
          onChange={handleChange}
          className="p-2 bg-slate-300 rounded-md shadow md:col-span-2 outline-none"
          placeholder="Empresa asociada"
        />
        <input
          type="email"
          name="email"
          value={asistenteForm.email}
          onChange={handleChange}
          className="p-2 bg-slate-300 rounded-md shadow md:col-span-2 outline-none"
          placeholder="Correo electrónico"
        />
        <button type="submit" className="bg-cyan-600 text-white py-2 rounded-md cursor-pointer">
          {editingAsistenteIndex !== null ? "Guardar Cambios" : "Añadir"}
        </button>
      </fieldset>
    </form>
  );
};