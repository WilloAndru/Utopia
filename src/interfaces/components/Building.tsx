import { useState } from "preact/hooks";
import { BUILDINGS } from "../../data/buildings";
import { useGameStore } from "../../game/gameStore";

export default function Building() {
  const clearUI = useGameStore((s) => s.clearUI);
  const [isSeeMore, setIsSeeMore] = useState(false);

  const handleBuild = () => {
    clearUI();
    console.log(1);
  };

  return (
    <main className="grid grid-cols-3 gap-2">
      {Object.values(BUILDINGS)
        .slice(1)
        .map((b, i) => (
          <section
            key={i}
            className="bg-emerald-300 rounded-xl px-4 py-2 flex flex-col gap-1 items-center justify-between hover:bg-emerald-200 border-3 border-emerald-700"
            onClick={handleBuild}
          >
            {/* Nombre de la estructura */}
            <h6>{b.name}</h6>
            {!isSeeMore ? (
              //Tarjeta que muestra la info inical
              <div className="flex flex-col gap-1 items-center">
                {/* Imagen de la estructura */}
                <div
                  style={{
                    width: b.size * 15,
                    height: b.size * 15,
                  }}
                  className={`${b.color} border border-black`}
                />
                {/* Costo de la estructura */}
                <div className="flex gap-2 items-center">
                  <img className="w-5" src="coin.png" alt="Coin" />
                  <p className="font-bold">{b.cost}</p>
                </div>
              </div>
            ) : (
              //Tarjeta que muestra la info detallada
              <div className="flex flex-col gap-1 items-center">
                <p>{b.description}</p>
                <div className="grid grid-cols-2 gap-1">
                  <p>
                    Tamaño: {b.size}x{b.size}
                  </p>
                </div>
              </div>
            )}
            {/* Boton para ver detalles */}
            <button
              className="btn-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsSeeMore((prev) => !prev);
              }}
            >
              {isSeeMore ? "Ver menos" : "Ver mas"}
            </button>
          </section>
        ))}
    </main>
  );
}
