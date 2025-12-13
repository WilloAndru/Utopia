import { useGameStore } from "../game/gameStore";

export default function Grid({ cellSize = 8 }) {
  const grid = useGameStore((s) => s.grid);

  return (
    <main
      className="grid border"
      style={{ gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)` }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <div
            key={`${x}-${y}`}
            className={cell.building?.color || "bg-green-500"}
            style={{ width: cellSize, height: cellSize }}
          />
        ))
      )}
    </main>
  );
}
