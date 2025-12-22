import { useState } from "preact/hooks";
import { useGameStore } from "../../../game/gameStore";
import type { BuildingData } from "../../../data/buildings";

type BuildingCardProps = {
  build: BuildingData;
};

export default function BuildingCard({ build }: BuildingCardProps) {
  const { clearUI } = useGameStore((s) => s);
  const { startBuild } = useGameStore((s) => s.modeState);
  const { money } = useGameStore((s) => s.resources);
  const [isSeeMore, setIsSeeMore] = useState(false);

  // Funcion al dar click en una tarjeta para construir
  const handleBuild = () => {
    startBuild(build);
    clearUI();
  };

  return (
    <section
      className={`
           rounded-xl px-4 py-2 flex flex-col gap-1 items-center justify-between border-3 border-emerald-700
            ${
              money >= build.cost // Mostramos disponibilidad de la estructura
                ? "bg-emerald-300 hover:bg-emerald-200"
                : "bg-gray-400 text-gray-800"
            }
        `}
      onClick={money >= build.cost ? handleBuild : undefined} // Validamos que halla dinero para construir
    >
      {/* Nombre de la estructura */}
      <h6>{build.name}</h6>
      {/* Muestra info basica o detallada */}
      {!isSeeMore ? (
        //Tarjeta que muestra la info inical
        <div className="flex flex-col gap-1 items-center">
          {/* Imagen de la estructura */}
          <div
            style={{
              width: build.size * 10,
              height: build.size * 10,
            }}
            className={`${build.color} border border-black`}
          />
          {/* Costo de la estructura */}
          <div className="flex gap-2 items-center">
            <img className="w-5" src="/moneda.png" alt="modena" />
            <p className="font-bold">{build.cost}</p>
          </div>
        </div>
      ) : (
        //Tarjeta que muestra la info detallada
        <div className="flex flex-col gap-1 items-center text-[0.8rem]">
          <h6>
            Tamaño: {build.size}x{build.size}
          </h6>
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
  );
}
