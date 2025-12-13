import { useGameStore } from "../game/gameStore";

export default function Grid({ cellSize = 12 }) {
  // Lee el estado real del juego
  const grid = useGameStore((s) => s.grid);
  const size = useGameStore((s) => s.size);

  return (
    <main
      className="grid border"
      style={{ gridTemplateColumns: `repeat(${size}, ${cellSize}px)` }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => (
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
