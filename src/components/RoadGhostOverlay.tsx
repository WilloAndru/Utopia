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
  const { money, piedra } = useGameStore((s) => s.resources);
  const { setMessage } = useGameStore((s) => s.ui);
  const currentPath = [...(roadPath ?? []), ...(previewPath ?? [])];

  // Si no estamos en modo de construccion, no se muestra el fantasma
  if (mode !== "buildRoad" || !buildData) return null;

  // Validamos si alguna celda está ocupada al mover el ghost o exedio el dinero
  useEffect(() => {
    if (!previewPath) return;

    // Validamos que el path se pueda construir
    const validateRoadBuild = () => {
      if (
        !canPlaceRoad(roadPath, previewPath) ||
        !canPlaceBuildingOnGrid(grid, previewPath, buildData.size)
      ) {
        return { message: "Camino inválido", value: false };
      }

      const totalCost = buildData.cost * currentPath.length;
      if (money < totalCost) {
        return { message: "Monedas insuficientes", value: false };
      }

      const requiredStone =
        (buildData.requiredResources?.piedra ?? 0) * currentPath.length;
      if (piedra < requiredStone) {
        return { message: "Piedra insuficiente", value: false };
      }

      return { value: true };
    };
    const canBuild = validateRoadBuild();

    setIsAvailable(canBuild);

    // Listener para confirmar construccion con enter
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        canBuild.value
          ? buildRoad(currentPath)
          : setMessage(canBuild.message ?? null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewPath]);

  return (
    <>
      {currentPath?.map((cell) => {
        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`absolute top-0 left-0 border ml-px mt-px opacity-75 pointer-events-none
              ${isAvailable.value ? buildData.color : "bg-red-600"}
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
