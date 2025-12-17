import { useEffect } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { canPlaceBuilding } from "../utils/canPlaceBuilding";

export default function GhostOverlay({ cellSize = 9 }) {
  const hoverCell = useGameStore((s) => s.hoverCell);
  const buildData = useGameStore((s) => s.modeState.buildData);
  const mode = useGameStore((s) => s.modeState.mode);
  const grid = useGameStore((s) => s.grid);
  const isSpaceFree = useGameStore((s) => s.modeState.isSpaceFree);
  const setIsSpaceFree = useGameStore((s) => s.modeState.setIsSpaceFree);

  // Si no estamos en modo de construccion, no se muestra el fantasma
  if (mode !== "build" || !hoverCell || !buildData) return null;

  // Calculamos el desplazamiento del ghost dentro del grid
  const clampedX = Math.min(hoverCell.x, grid.length - buildData.size);
  const clampedY = Math.min(hoverCell.y, grid.length - buildData.size);

  // Validamos si alguna celda está ocupada al mover el ghost
  useEffect(() => {
    const canBuild = canPlaceBuilding(
      grid,
      buildData.size,
      hoverCell.x,
      hoverCell.y
    );
    canBuild ? setIsSpaceFree(true) : setIsSpaceFree(false);
  }, [hoverCell]);

  return (
    <div
      className={`absolute top-0 left-0 pointer-events-none border ml-px mt-px ${buildData.color} opacity-75`}
      style={{
        transform: `translate(${clampedY * cellSize}px, 
        ${clampedX * cellSize}px)`,
        width: `${buildData.size * cellSize}px`,
        height: `${buildData.size * cellSize}px`,
        borderColor: `${isSpaceFree ? "black" : "red"}`,
      }}
    />
  );
}
