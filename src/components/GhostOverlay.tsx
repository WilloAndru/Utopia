import { useGameStore } from "../game/gameStore";

export default function GhostOverlay({ cellSize = 9 }) {
  const hoverCell = useGameStore((s) => s.hoverCell);
  const buildData = useGameStore((s) => s.modeState.buildData);
  const mode = useGameStore((s) => s.modeState.mode);

  // Si no estamos en modo de construccion no se muestra el fantasma
  if (mode !== "build" || !hoverCell || !buildData) return null;

  // Calculamos el dezplazamiento del div
  const offsetX = hoverCell.y * cellSize;
  const offsetY = hoverCell.x * cellSize;

  return (
    <div
      className={`absolute top-0 left-0 pointer-events-none border border-black ${buildData.color} opacity-75`}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        width: `${buildData.size * cellSize}px`,
        height: `${buildData.size * cellSize}px`,
      }}
    />
  );
}
