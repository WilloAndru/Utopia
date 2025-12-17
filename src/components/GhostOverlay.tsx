import { useGameStore } from "../game/gameStore";
import { ghostCells as resolveGhostCells } from "../utils/ghostCells";
import { getGhostBuildingBorder } from "../utils/getGhostBuildingBorder";

export default function GhostOverlay({ cellSize = 9 }) {
  const hoverCell = useGameStore((s) => s.hoverCell);
  const buildData = useGameStore((s) => s.modeState.buildData);
  const mode = useGameStore((s) => s.modeState.mode);

  if (mode !== "build" || !hoverCell || !buildData) return null;

  const ghostCells = resolveGhostCells(hoverCell, buildData.size);

  const offsetX = hoverCell.y * cellSize;
  const offsetY = hoverCell.x * cellSize;

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        display: "grid",
        gridTemplateColumns: `repeat(${buildData.size}, ${cellSize}px)`,
      }}
    >
      {ghostCells.map((cell) => {
        const borderClasses = getGhostBuildingBorder(
          ghostCells,
          cell.x,
          cell.y
        );

        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`${buildData.color} opacity-80 ${borderClasses} box-border`}
            style={{
              width: cellSize,
              height: cellSize,
            }}
          />
        );
      })}
    </div>
  );
}
