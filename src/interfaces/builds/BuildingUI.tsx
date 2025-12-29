import { BUILDINGS } from "../../data/buildings";
import { useGameStore } from "../../game/gameStore";

type ResourceProps = {
  name: string;
  cellSize: number;
};

export default function BuildingUI({ name, cellSize }: ResourceProps) {
  // Obtenemos los datos del objeto
  const build = Object.values(BUILDINGS).find((item) => item.name === name);
  const { hoverCell, startEdit } = useGameStore((s) => s.mode);
  const { deleteBuilding } = useGameStore();
  const { clearUI } = useGameStore((s) => s.ui);

  // Manejo de error
  if (!build) return null;

  return (
    <main
      className={`py-2 px-3 rounded-xl border-3 border-emerald-700 w-fit flex flex-col gap-1 items-center absolute top-0 left-0 ${build.color}`}
      style={{
        transform: `translate(${(hoverCell!.y + 1) * cellSize}px, 
          ${(hoverCell!.x + 1) * cellSize}px)`,
      }}
    >
      <h6>{build.name}</h6>
      {/* Lista de efectos que aplica actualmente */}
      {build.effects && (
        <ul className="flex gap-2">
          {Object.entries(build.effects).map(([objName, quantity]) => (
            <li className="flex  gap-2" key={objName}>
              <img className="h-5" src={`/${objName}.png`} alt={objName} />
              <h6>{quantity}</h6>
            </li>
          ))}
        </ul>
      )}
      {/* Boton para mover */}
      <button
        onClick={() => {
          startEdit(hoverCell!.x, hoverCell!.y, build);
          clearUI();
        }}
        className="btn-2 flex items-center gap-1 w-full justify-center"
      >
        Mover
      </button>
      {/* Boton para demoler */}
      <button
        onClick={() => deleteBuilding(hoverCell!.x, hoverCell!.y, build)}
        className="btn-2 flex items-center gap-1"
      >
        <span>Demoler</span>
      </button>
    </main>
  );
}
