import { useEffect, useState } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { canPlaceBuilding } from "../utils/canPlaceBuilding";

type GhostOverlayProps = {
  cellSize: number;
};

export default function GhostOverlay({ cellSize }: GhostOverlayProps) {
  const { buildStructure } = useGameStore((s) => s);
  const { grid } = useGameStore((s) => s.grid);
  const { hoverCell, mode, buildData, startRoadBuild } = useGameStore(
    (s) => s.modeState
  );
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

  // Cuando le damos click al fantasma
  const handleBuildStart = () => {
    if (buildData.id === 1) {
      startRoadBuild(buildData);
    } else {
      buildStructure(clampedX, clampedY, buildData);
    }
  };

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
      onClick={() => isSpaceFree && handleBuildStart()}
    />
  );
}
