import { BUILDINGS } from "../data/buildings";
import { useGameStore } from "../game/gameStore";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const { month, saveGame, loadGame } = useGameStore();
  const { openUI } = useGameStore((s) => s.ui);
  const { money, poblacion } = useGameStore((s) => s.resources);
  const castleData = BUILDINGS.castle;

  return (
    <header className="w-full flex gap-4 absolute top-0 p-2 bg-emerald-300 border-b-4 border-emerald-500 items-center justify-between">
      {/* Icono */}
      <div className="flex gap-2">
        <img className="w-9" src="/icon.png" alt="icon" />
        <h4>Utopia</h4>
      </div>
      {/* Seccion derecha */}
      <div className="flex gap-4 items-center">
        <button className="btn-1" onClick={saveGame}>
          Save
        </button>
        <button className="btn-1" onClick={loadGame}>
          Load
        </button>
        {/* Conteo de meses */}
        <span className="font-bold tracking-wider px-4 py-2 border-4 border-emerald-500 rounded-xl">
          Mes {month}
        </span>
        {/* Monedero */}
        <div className="px-4 py-2 border-4 border-emerald-500 rounded-xl flex gap-2">
          <img className="w-6" src="/moneda.png" alt="moneda" />
          <h6>{money}</h6>
        </div>
        {/* Poblacion */}
        <div className="px-4 py-2 border-4 border-emerald-500 rounded-xl flex gap-2">
          <img className="w-6" src="/poblacion.png" alt="poblacion" />
          <h6>{poblacion}</h6>
        </div>
        {/* Boton de menu */}
        <button
          className="btn-1"
          data-ui-trigger // Asignamos trigger para evitar bug de eventos
          onClick={() => openUI(castleData.id, castleData.name)}
        >
          <LuMenu />
        </button>
      </div>
    </header>
  );
}
