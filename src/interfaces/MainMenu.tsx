import { IoCloseSharp } from "react-icons/io5";
import { useGameStore } from "../game/gameStore";
import Building from "./components/Building";

export default function MainMenu() {
  const clearUI = useGameStore((s) => s.clearUI);

  const mainMenuSections = [
    { name: "Construcción", icon: "construccion.png" },
    { name: "Almacen", icon: "almacen.png" },
    { name: "Población", icon: "agricultor.png" },
  ];

  return (
    <aside className="flex flex-col gap-2 px-4 py-2 rounded-xl bg-emerald-300 w-160 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-emerald-500">
      {/* Header */}
      <header className="flex w-full justify-between">
        <h4>Menu principal</h4>
        <button className="btn-1 -mr-2" onClick={() => clearUI()}>
          <IoCloseSharp />
        </button>
      </header>
      {/* Main */}
      <main className="flex gap-2">
        {/* Secciones de menu */}
        <nav className="rounded-xl flex flex-col border-4 border-emerald-500 bg-emerald-500 gap-1">
          {mainMenuSections.map((i, index) => (
            <button
              className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-emerald-200 bg-emerald-300"
              key={index}
            >
              <img className="w-10" src={i.icon} alt={i.name} />
              <h6>{i.name}</h6>
            </button>
          ))}
        </nav>
        {/* Interfaz mutable */}
        <section className="bg-emerald-500 rounded-xl px-3 py-2 -mr-2 w-101">
          <Building />
        </section>
      </main>
    </aside>
  );
}
