import { MagnifyingGlassIcon} from "@heroicons/react/24/outline";

export const BusquedaAA = ({ searchQuery, setSearchQuery }) => {
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <fieldset className="bg-slate-100 px-2 sm:px-4 py-4 rounded-lg border border-slate-400 shadow">
        <legend className="text-slate-500 font-semibold">Buscar Asistente</legend>
        <div className="flex items-center bg-slate-300 rounded-lg px-2">
            <input
              type="search"
              className="py-2 w-full outline-none"
              placeholder="Buscar por nombre, empresa o email"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon className="h-6 w-6 stroke-2 stroke-slate-600" />            
        </div>
    </fieldset>
  );
};