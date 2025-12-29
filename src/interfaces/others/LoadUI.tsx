import { IoCloseSharp } from "react-icons/io5";
import { useGameStore } from "../../game/gameStore";

export default function LoadUI() {
  const { clearUI } = useGameStore((s) => s.ui);
  const { loadGame } = useGameStore();
  const hasSave = (slot: number) =>
    localStorage.getItem(`gameState_${slot}`) !== null;

  return (
    <main className="ui">
      {/* Titulo */}
      <header>
        <h4>Cargar partida</h4>
        <button className="btn-1 -mr-2" onClick={() => clearUI()}>
          <IoCloseSharp />
        </button>
      </header>
      {/* Casilleros */}
      <section className="bg-emerald-500 rounded-xl p-2 -mr-2 w-full h-81 grid grid-cols-3 auto-rows-[149px] gap-2 ">
        {Array.from({ length: 6 }).map((_, i) => (
          <button
            key={i}
            className="btn-2"
            onClick={() => {
              loadGame(i);
              clearUI();
            }}
          >
            Casillero {1 + i}
            {hasSave(i) && <span className="font-bold">Cargar</span>}
          </button>
        ))}
      </section>
    </main>
  );
}
