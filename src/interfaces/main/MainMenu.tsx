import { IoCloseSharp } from "react-icons/io5";
import Building from "./components/Building";
import Store from "./components/Store";
import { useState } from "preact/hooks";
import { useGameStore } from "../../game/gameStore";

// Secciones del menu principal
const SECTIONS = {
  Construcción: Building,
  Almacen: Store,
} as const;
type SectionKey = keyof typeof SECTIONS;

export default function MainMenu() {
  // Varibles que manejan el estado de cambio entre secciones del menu
  const [activeSection, setActiveSection] =
    useState<SectionKey>("Construcción");
  const ActiveComponent = SECTIONS[activeSection];

  const { clearUI } = useGameStore((s) => s.ui); // Funcion para cerrar interfaz

  return (
    <aside className="ui">
      {/* Titulo */}
      <header>
        <h4>Menu principal</h4>
        <button className="btn-1 -mr-2" onClick={() => clearUI()}>
          <IoCloseSharp />
        </button>
      </header>
      {/* Menu principal */}
      <main className="flex gap-2">
        {/* Secciones del menu */}
        <nav className="rounded-xl flex flex-col border-4 border-emerald-500 bg-emerald-500 gap-2 w-76 p-1">
          {(Object.keys(SECTIONS) as SectionKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center gap-3 py-2 px-4 rounded-xl border-3 border-emerald-500
              ${
                // Resaltamos la seccion que se selecciono
                activeSection === key
                  ? "bg-emerald-200 border-emerald-700"
                  : "bg-emerald-300 hover:bg-emerald-200"
              }`}
            >
              <img
                className="w-10"
                src={`${key.toLowerCase()}.png`}
                alt={key}
              />
              <h6>{key}</h6>
            </button>
          ))}
        </nav>
        {/* Interfaz mutable */}
        <section className="bg-emerald-500 rounded-xl p-2 -mr-2 w-full h-81">
          <ActiveComponent />
        </section>
      </main>
    </aside>
  );
}
