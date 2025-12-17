import { BUILDINGS } from "../data/buildings";
import { useGameStore } from "../game/gameStore";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const openUI = useGameStore((s) => s.openUI);
  const money = useGameStore((s) => s.money);
  const castleData = BUILDINGS.castle;

  return (
    <header className="w-full flex gap-4 absolute top-0 p-2 bg-emerald-300 border-b-4 border-emerald-500 items-center justify-between">
      {/* Icono */}
      <div className="flex gap-2">
        <img className="w-9" src="/icon.png" alt="icon" />
        <h4>Utopia</h4>
      </div>
      {/* Seccion derecha */}
      <div className="flex gap-2">
        {/* Monedero */}
        <div className="px-4 py-2 border-4 border-emerald-500 rounded-xl flex gap-2">
          <img className="w-6" src="/coin.png" alt="coin" />
          <h6>{money}</h6>
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
