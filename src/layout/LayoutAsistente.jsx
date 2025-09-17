import { Cabecera } from "../components/tablero-asistente/Cabecera"

export const LayoutAsistente = ( {children} ) => {
  return (
    <main className="min-h-screen bg-linear-to-r from-slate-950 to-blue-950">
      <Cabecera />
      <section className="max-w-6xl mx-auto py-8">
        {children}
      </section>
    </main>
  )
}
