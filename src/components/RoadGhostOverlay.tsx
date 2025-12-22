import { useEffect } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { getRoadGhostBorders } from "../utils/getRoadGhostBorders";
import {
  canPlaceBuildingOnGrid,
  canPlaceRoad,
} from "../utils/canPlaceBuilding";

type RoadGhostOverlayProps = {
  cellSize: number;
};

export default function RoadGhostOverlay({ cellSize }: RoadGhostOverlayProps) {
  const { mode, buildData } = useGameStore((s) => s.modeState);
  const { isAvailable, setIsAvailable } = useGameStore((s) => s.modeState);
  const { previewPath, roadPath } = useGameStore((s) => s.modeState);
  const { buildRoad } = useGameStore((s) => s);
  const { grid } = useGameStore((s) => s.grid);
  const { money } = useGameStore((s) => s.resources);
  const currentPath = [...(roadPath ?? []), ...(previewPath ?? [])];

  // Si no estamos en modo de construccion, no se muestra el fantasma
  if (mode !== "buildRoad" || !buildData) return null;

  // Validamos si alguna celda está ocupada al mover el ghost o exedio el dinero
  useEffect(() => {
    if (!previewPath) return;

    const canBuild =
      canPlaceRoad(roadPath, previewPath) && // Validamos que no se genere sobre el path previo
      canPlaceBuildingOnGrid(grid, previewPath, buildData.size) && // Validamos que no choque con una estructura
      money >= buildData.cost * currentPath!.length; // Validamos que no exeda el dinero

    setIsAvailable(canBuild);

    // Listener para confirmar construccion con enter
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        canBuild && buildRoad(currentPath);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPath]);

  return (
    <>
      {currentPath?.map((cell) => {
        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`absolute top-0 left-0 border ml-px mt-px opacity-75 pointer-events-none
              ${isAvailable ? buildData.color : "bg-red-600"}
              ${getRoadGhostBorders(currentPath, cell)}
            `}
            style={{
              transform: `translate(${cell.y * cellSize}px, ${
                cell.x * cellSize
              }px)`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
          />
        );
      })}
    </>
  );
}
