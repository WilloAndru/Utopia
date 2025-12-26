import { TERRAINOBJECTS } from "../../data/terrainObject";
import { useGameStore } from "../../game/gameStore";

type ResourceProps = {
  name: string;
  cellSize: number;
};

export default function ResourceUI({ name, cellSize }: ResourceProps) {
  // Obtenemos los datos del objeto
  const object = Object.values(TERRAINOBJECTS).find(
    (item) => item.name === name
  );
  const { hoverCell } = useGameStore((s) => s.modeState);
  const { deleteTerrainObject } = useGameStore((s) => s);

  // Manejo de error
  if (!object) return null;

  return (
    <main
      className={`py-2 px-3 rounded-xl border-3 border-emerald-700 w-fit flex flex-col gap-1 items-center absolute top-0 left-0 ${object.color}`}
      style={{
        transform: `translate(${(hoverCell!.y + 1) * cellSize}px, 
        ${(hoverCell!.x + 1) * cellSize}px)`,
      }}
    >
      <h6>{object.name}</h6>
      {/* Lista de materiales que otorga */}
      <ul className="flex gap-2">
        {Object.entries(object.effects).map(([objName, quantity]) => (
          <li className="flex  gap-2" key={objName}>
            <img className="w-5" src={`/${objName}.png`} alt={objName} />
            <h6>+ {quantity}</h6>
          </li>
        ))}
      </ul>
      {/* Boton para demoler */}
      <button
        onClick={() => deleteTerrainObject(hoverCell!.x, hoverCell!.y, object)}
        className="btn-2 flex items-center gap-1"
      >
        <span>Demoler por</span>
        <img className="w-4" src="/moneda.png" alt="Moneda" />
        <span>{object.cost}</span>
      </button>
    </main>
  );
}
