import { useEffect, useState } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { canPlaceBuilding } from "../utils/canPlaceBuilding";

export default function GhostOverlay({ cellSize = 10 }) {
  const { hoverCell, buildStructure } = useGameStore((s) => s);
  const { mode, buildData } = useGameStore((s) => s.modeState);
  const { grid } = useGameStore((s) => s.grid);
  const [isSpaceFree, setIsSpaceFree] = useState(false);

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
      className={`absolute top-0 left-0 border ml-px mt-px black ${
        isSpaceFree ? buildData.color : "bg-red-600"
      } opacity-75`}
      style={{
        transform: `translate(${clampedY * cellSize}px, 
        ${clampedX * cellSize}px)`,
        width: `${buildData.size * cellSize}px`,
        height: `${buildData.size * cellSize}px`,
      }}
      onClick={() =>
        isSpaceFree && buildStructure(clampedX, clampedY, buildData)
      }
    />
  );
}
