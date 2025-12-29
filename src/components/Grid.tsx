import { useGameStore } from "../game/gameStore";
import { calculatePath } from "../utils/calculatePath ";
import { getBuildingBorder } from "../utils/getBuildingBorder";

type GridProps = {
  cellSize: number;
};

export default function Grid({ cellSize }: GridProps) {
  const { grid } = useGameStore((s) => s.grid);
  const { openUI, setMessage } = useGameStore((s) => s.ui);
  const { mode, hoverCell, setHoverCell } = useGameStore((s) => s.mode);
  const { previewPath, setPreviewPath, setRoadPath } = useGameStore(
    (s) => s.mode
  );
  const { isAvailable, posEdit } = useGameStore((s) => s.mode);

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
    // Si esta en modo edicion
    else if (mode === "edit") {
      setHoverCell(x, y);
    }
  };

  return (
    <main
      className="grid border border-gray-700"
      style={{ gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)` }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => {
          const borderClasses = getBuildingBorder(grid, x, y); // Validamos si la celda tiene borde
          const isEditCell = posEdit?.x === x && posEdit?.y === y; // Validamos si la celda esta en modo edicion

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
                // Si estamos en modo edicion, ocultamos visualmente la celda a mover
                ...(isEditCell && {
                  backgroundColor: "#22c55e",
                  border: "none",
                }),
              }}
              onMouseEnter={() => handleHover(x, y)}
              onClick={() => {
                // Se guarda el previewPath en roadPath y se continua con el modo buildRoad
                if (mode === "buildRoad" && previewPath) {
                  if (isAvailable.value) {
                    setRoadPath(previewPath.slice(0, -1));
                    setHoverCell(x, y);
                    setPreviewPath([{ x, y }]);
                  } else {
                    setMessage(isAvailable.message ?? null);
                  }
                }
                if (cell.building) {
                  setHoverCell(x, y);
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
