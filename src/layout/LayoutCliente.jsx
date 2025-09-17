import { CabeceraCliente } from "../components/tablero-cliente/CabeceraCliente"
import { NavegacionCliente } from "../components/tablero-cliente/NavegacionCliente"

export const LayoutCliente = ({children}) => {
  return (
    <main className="min-h-screen bg-linear-to-r from-slate-950 to-blue-950">
        <CabeceraCliente />
        <div className="grid grid-cols-6 min-h-screen">
          <NavegacionCliente />        
          {children}
        </div>
    </main>
  )
}
