import { IoCloseSharp } from "react-icons/io5";
import { useGameStore } from "../../game/gameStore";
import { useState } from "preact/hooks";

export default function SaveUI() {
  const [slot, setSlot] = useState(0);
  const [showAdvice, setShowAdvice] = useState(false);
  const { clearUI } = useGameStore((s) => s.ui);
  const { saveGame } = useGameStore();
  const hasSave = (slot: number) =>
    localStorage.getItem(`gameState_${slot}`) !== null;

  return (
    <main className="ui items-center justify-center">
      {/* Titulo */}
      <header>
        <h4>Guardar partida</h4>
        <button className="btn-1 -mr-2" onClick={() => clearUI()}>
          <IoCloseSharp />
        </button>
      </header>
      {/* Casilleros */}
      <section className="w-full h-81 grid grid-cols-3 auto-rows-[149px] gap-2 p-2">
        {Array.from({ length: 6 }).map((_, i) => {
          const dataGame = JSON.parse(
            localStorage.getItem(`gameState_${i}`) || "null"
          );
          return (
            <button
              key={i}
              className="btn-2"
              onClick={() => {
                if (hasSave(i)) {
                  setShowAdvice(true);
                  setSlot(i);
                } else {
                  saveGame(i);
                  clearUI();
                }
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
                  <span className="flex gap-2 items-center">
                    <img className="h-4" src="/moneda.png" alt="moneda" />
                    {dataGame.resources.money}
                  </span>
                  <span className="flex gap-2 items-center">
                    <img className="h-4" src="/poblacion.png" alt="poblacion" />
                    {dataGame.resources.poblacion}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </section>
      {/* Aviso de confirmar sobrescribir partida */}
      {showAdvice && (
        <section className="bg-emerald-300 border-4 border-emerald-700 px-4 py-2 rounded-xl absolute w-120 text-center">
          <h4>¿Seguro de que quieres sobrescribir la partida?</h4>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowAdvice(false)}
              className="px-4 py-2 w-full border-4 border-red-700 bg-red-500 rounded-xl font-bold text-white hover:bg-red-400"
            >
              No
            </button>
            <button
              onClick={() => {
                saveGame(slot);
                clearUI();
              }}
              className="px-4 py-2 w-full border-4 border-green-700 bg-green-500 rounded-xl font-bold text-white hover:bg-green-400"
            >
              Si
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
