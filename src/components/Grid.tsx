import { useGameStore } from "../game/gameStore";

export default function Grid({ cellSize = 12 }) {
  useGameStore.getState().initGrid(50);
  const grid = useGameStore((state) => state.grid);
  const placeBuilding = useGameStore((state) => state.placeBuilding);

  const size = grid.length;

  return (
    <main
      className="grid"
      style={{ gridTemplateColumns: `repeat(${size}, ${cellSize}px)` }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <div
            key={`${x}-${y}`}
            onClick={() => placeBuilding(x, y)}
            className="border border-gray-500 bg-gray-900"
            style={{ width: cellSize, height: cellSize }}
          />
        ))
      )}
    </main>
  );
}
