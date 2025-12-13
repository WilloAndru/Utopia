import { useGameStore } from "../game/gameStore";

export default function Grid({ cellSize = 12 }) {
  const grid = useGameStore((s) => s.grid);

  return (
    <main
      className="grid border"
      style={{ gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)` }}
    >
      {Array.from({ length: grid.length }, (_, x) =>
        Array.from({ length: grid.length }, (_, y) => (
          <div
            key={`${x}-${y}`}
            className="bg-green-500"
            style={{ width: cellSize, height: cellSize }}
          />
        ))
      )}
    </main>
  );
}
