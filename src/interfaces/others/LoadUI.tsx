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
      <section className="w-full h-81 grid grid-cols-3 auto-rows-[149px] gap-2 bg-transparent p-2">
        {Array.from({ length: 6 }).map((_, i) => {
          const dataGame = JSON.parse(
            localStorage.getItem(`gameState_${i}`) || "null"
          );
          return (
            <button
              key={i}
              className="btn-2"
              onClick={() => {
                loadGame(i);
                clearUI();
              }}
            >
              {/* Titulo */}
              <p className="text-xl mb-1">
                {hasSave(i) ? `Partida ${i + 1}` : "Vacio"}
              </p>
              {/* Datos de partida */}
              {hasSave(i) && (
                <div className="flex flex-col gap-1 text-[1rem] items-center">
                  <span>Mes {dataGame.month}</span>
                  <span className="flex gap-2">
                    <img className="h-4" src="/moneda.png" alt="moneda" />
                    {dataGame.resources.money}
                  </span>
                  <span className="flex gap-2">
                    <img className="h-4" src="/poblacion.png" alt="poblacion" />
                    {dataGame.resources.poblacion}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </section>
    </main>
  );
}
