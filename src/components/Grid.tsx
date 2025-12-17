import { useGameStore } from "../game/gameStore";
import { getBuildingBorder } from "../utils/getBuildingBorder";

export default function Grid({ cellSize = 9 }) {
  const grid = useGameStore((s) => s.grid);
  const openUI = useGameStore((s) => s.openUI);
  const mode = useGameStore((s) => s.modeState.mode);
  const setHoverCell = useGameStore((s) => s.setHoverCell);

  return (
    <main
      className="grid border border-gray-700"
      style={{ gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)` }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => {
          // Validamos si la celda tiene borde
          const borderClasses = getBuildingBorder(grid, x, y);

          return (
            <div
              key={`${x}${y}`}
              className={`
                ${cell.building?.color || "bg-green-500"}
                ${borderClasses}
              `}
              style={{
                width: cellSize,
                height: cellSize,
              }}
              onMouseEnter={() => {
                if (mode === "build") {
                  setHoverCell(x, y);
                }
              }}
              onClick={() => {
                if (cell.building) {
                  openUI(cell.building.id, cell.building.name);
                }
              }}
            />
          );
        })
      )}
    </main>
  );
}
