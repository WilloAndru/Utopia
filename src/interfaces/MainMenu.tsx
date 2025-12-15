import { IoCloseSharp } from "react-icons/io5";
import { useGameStore } from "../game/gameStore";

export default function MainMenu() {
  const clearUI = useGameStore((s) => s.clearUI);

  return (
    <aside className="px-6 py-4 rounded-2xl bg-amber-300 w-150 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-700">
      <header className="flex w-full justify-between">
        <h4>Menu principal</h4>
        <button className="btn-1 -mr-2" onClick={() => clearUI()}>
          <IoCloseSharp />
        </button>
      </header>
      <p>Menú general del reino</p>
    </aside>
  );
}
