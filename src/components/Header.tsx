import { useEffect } from "preact/hooks";
import { castleData } from "../data/buildings";
import { useGameStore } from "../game/gameStore";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const idOpenUI = useGameStore((s) => s.idOpenUI);
  const clearInterfaces = useGameStore((s) => s.clearInterfaces);

  const openUI = useGameStore((s) => s.openUI);

  useEffect(() => {
    console.log(idOpenUI);
  }, [idOpenUI]);

  return (
    <header className="w-full flex gap-4 absolute top-0 p-2">
      <button
        className="btn-1"
        onClick={() => {
          if (idOpenUI === castleData.id) {
            clearInterfaces();
          } else {
            openUI(castleData.id, castleData.name);
          }
        }}
      >
        <LuMenu />
      </button>
    </header>
  );
}
