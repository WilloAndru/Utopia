import { useEffect, useState } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { canPlaceBuildingOnGrid } from "../utils/canPlaceBuilding";

type GhostOverlayProps = {
  cellSize: number;
};

export default function GhostOverlay({ cellSize }: GhostOverlayProps) {
  const { buildStructure } = useGameStore((s) => s);
  const { grid } = useGameStore((s) => s.grid);
  const { mode, buildData } = useGameStore((s) => s.modeState);
  const { hoverCell, startRoadBuild } = useGameStore((s) => s.modeState);
  const [isSpaceFree, setIsSpaceFree] = useState(false);

  // Si no estamos en modo de construccion o edicion, no se muestra el fantasma
  if ((mode !== "build" && mode !== "edit") || !hoverCell || !buildData)
    return null;

  // Posicion para cuadrar dentro del grid, estructuras con dos o mas celdas de size
  const clampedX = Math.min(hoverCell.x, grid.length - buildData.size);
  const clampedY = Math.min(hoverCell.y, grid.length - buildData.size);

  // Validamos si alguna celda está ocupada al mover el ghost
  useEffect(() => {
    const canBuild = canPlaceBuildingOnGrid(grid, [hoverCell], buildData.size);
    canBuild ? setIsSpaceFree(true) : setIsSpaceFree(false);
  }, [hoverCell]);

  // Cuando le damos click al fantasma
  const handleClick = () => {
    if (mode === "build") {
      buildData.name === "Camino"
        ? startRoadBuild(buildData)
        : buildStructure(clampedX, clampedY, buildData);
    } else {
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
      onClick={() => isSpaceFree && handleClick()}
    />
  );
}
