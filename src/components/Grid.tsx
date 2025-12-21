import { useGameStore } from "../game/gameStore";
import { calculatePath } from "../utils/calculatePath ";
import { getBuildingBorder } from "../utils/getBuildingBorder";

type GridProps = {
  cellSize: number;
};

export default function Grid({ cellSize }: GridProps) {
  const { grid } = useGameStore((s) => s.grid);
  const { openUI } = useGameStore((s) => s);
  const { mode, hoverCell, setHoverCell } = useGameStore((s) => s.modeState);
  const { previewPath, setPreviewPath, roadPath, setRoadPath } = useGameStore(
    (s) => s.modeState
  );
  const { isAvailable } = useGameStore((s) => s.modeState);

  // Que pasa cuando se pasa el mouse sobre las celdas en modos no idle
  const handleHover = (x: number, y: number) => {
    // Si es el modo de construccion de edifico
    if (mode === "build") {
      setHoverCell(x, y);
    }
    // Si es el modo de construccion de camino
    else if (mode === "buildRoad" && hoverCell) {
      const path = calculatePath(hoverCell, { x, y });
      setPreviewPath(path);
    }
  };

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
              onMouseEnter={() => handleHover(x, y)}
              onClick={() => {
                // Se guarda el previewPath en roadPath y se continua con el modo buildRoad
                if (mode === "buildRoad" && previewPath && isAvailable) {
                  setRoadPath(previewPath.slice(0, -1));
                  setHoverCell(x, y);
                  setPreviewPath([{ x, y }]);
                }
                if (cell.building) openUI(cell.building.id, cell.building.name);
              }}
            />
          );
        })
      )}
    </main>
  );
}
