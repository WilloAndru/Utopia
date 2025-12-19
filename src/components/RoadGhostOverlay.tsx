import { useState } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import { getRoadGhostBorders } from "../utils/getRoadGhostBorders";

type RoadGhostOverlayProps = {
  cellSize: number;
};

export default function RoadGhostOverlay({ cellSize }: RoadGhostOverlayProps) {
  const { mode, buildData, hoverPath, setHoverPath } = useGameStore(
    (s) => s.modeState
  );
  const [isSpaceFree, setIsSpaceFree] = useState(false);

  // Si no estamos en modo de construccion, no se muestra el fantasma
  if (mode !== "buildRoad" || !buildData) return null;

  return (
    <>
      {hoverPath?.map((cell) => {
        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`absolute top-0 left-0 border ml-px mt-px opacity-75
              ${buildData.color} 
              ${getRoadGhostBorders(hoverPath, cell)}
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
