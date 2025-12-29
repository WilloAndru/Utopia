import { useState } from "preact/hooks";
import { useGameStore } from "../../../game/gameStore";
import type { BuildingData, ResourceType } from "../../../data/buildings";

type BuildingCardProps = {
  build: BuildingData;
};

export default function BuildingCard({ build }: BuildingCardProps) {
  const { setMessage, clearUI } = useGameStore((s) => s.ui);
  const { startBuild } = useGameStore((s) => s.mode);
  const resources = useGameStore((s) => s.resources);
  const [isSeeMore, setIsSeeMore] = useState(false);

  // Hacemos los calculos para comprobar que la construccion se puede construir
  const handleIsAvailable = () => {
    // Si no hay suficiente dinero
    if (resources.money < build.cost) {
      return {
        message: "Monedas insuficientes",
        value: false,
      };
    }
    // Si no hay suficientes recursos
    const missingResource = Object.entries(build.requiredResources).find(
      ([key, value]) => resources[key as ResourceType] < value
    );
    if (missingResource) {
      const [key] = missingResource;
      return {
        message: `${key.charAt(0).toUpperCase() + key.slice(1)} insuficiente`,
        value: false,
      };
    }
    // Si todo esta disponible
    return { message: "", value: true };
  };
  const isAvailable = handleIsAvailable();

  // Funcion al dar click en una tarjeta para construir
  const handleBuild = () => {
    // Si esta todo correcto
    if (isAvailable.value) {
      startBuild(build);
      clearUI();
    }
    // Si falta algo mandamos mensaje
    else {
      setMessage(isAvailable.message);
    }
  };

  return (
    <section
      className={`
           rounded-xl px-4 py-2 flex flex-col gap-1 items-center justify-between border-3 border-emerald-700
            ${
              isAvailable.value // Mostramos disponibilidad de la estructura
                ? "bg-emerald-300 hover:bg-emerald-200"
                : "bg-gray-400 text-gray-800"
            }
        `}
      onClick={handleBuild}
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
        <div className="flex flex-col gap-2 items-center text-[0.8rem]">
          {/* Materiales necesarios para construir */}
          <div className="flex gap-3">
            {Object.entries(build.requiredResources).map(([key, value]) => (
              <div className="flex gap-1">
                <img className="w-4" src={`/${key}.png`} alt={key} />
                <h6>- {value}</h6>
              </div>
            ))}
          </div>
          {/* Efectos que aplica */}
          {build.effects && (
            <div className="flex gap-3">
              {Object.entries(build.effects).map(([key, value]) => (
                <div className="flex gap-1">
                  <img className="h-4" src={`/${key}.png`} alt={key} />
                  <h6>+ {value}</h6>
                </div>
              ))}
            </div>
          )}
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
