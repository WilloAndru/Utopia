import { castleData } from "../data/buildings";
import { useGameStore } from "../game/gameStore";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const openUI = useGameStore((s) => s.openUI);

  return (
    <header className="w-full flex gap-4 absolute top-0 p-2">
      <button
        className="btn-1"
        data-ui-trigger // Asignamos trigger
        onClick={() => openUI(castleData.id, castleData.name)}
      >
        <LuMenu />
      </button>
    </header>
  );
}
