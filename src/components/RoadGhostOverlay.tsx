import { useState, useEffect } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { getRoadGhostBorders } from "../utils/getRoadGhostBorders";
import { canPlaceBuilding } from "../utils/canPlaceBuilding";

type RoadGhostOverlayProps = {
  cellSize: number;
};

export default function RoadGhostOverlay({ cellSize }: RoadGhostOverlayProps) {
  const { mode, buildData, hoverPath, setHoverCell } = useGameStore(
    (s) => s.modeState
  );
  const { grid } = useGameStore((s) => s.grid);
  const { money } = useGameStore((s) => s.economy);
  const [isAvailable, setIsAvailable] = useState(false);

  // Si no estamos en modo de construccion, no se muestra el fantasma
  if (mode !== "buildRoad" || !buildData) return null;

  // Validamos si alguna celda está ocupada al mover el ghost o exedio el dinero
  useEffect(() => {
    const { x, y } = hoverPath!.at(-1)!; // Coordenadas del ultimo path

    const canBuild =
      canPlaceBuilding(grid, buildData.size, x, y) && // Validamos que no choque con una estructura
      money >= buildData.cost * hoverPath!.length; // Validamos que no exeda el dinero

    setIsAvailable(canBuild);
  }, [hoverPath]);

  return (
    <>
      {hoverPath?.map((cell) => {
        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`absolute top-0 left-0 border ml-px mt-px opacity-75
              ${isAvailable ? buildData.color : "bg-red-600"}
              ${getRoadGhostBorders(hoverPath, cell)}
            `}
            style={{
              transform: `translate(${cell.y * cellSize}px, ${
                cell.x * cellSize
              }px)`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
            onClick={() => isAvailable && setHoverCell(cell.x, cell.y)}
          />
        );
      })}
    </>
  );
}
