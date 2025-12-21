import Header from "./components/Header";
import Grid from "./components/Grid";
import UIManager from "./interfaces/UIManager";
import { useGameStore } from "./game/gameStore";
import { useEffect } from "preact/hooks";
import GhostOverlay from "./components/GhostOverlay";
import RoadGhostOverlay from "./components/RoadGhostOverlay";
import { BUILDINGS } from "./data/buildings";

export function App() {
  const cellSize = 10;
  const clearUI = useGameStore((s) => s.clearUI);
  const { mode, cancelState, startBuild } = useGameStore((s) => s.modeState);
  const { buildStructure } = useGameStore((s) => s);

  // Detecta cuando se usa Esc para cerrar interfaces o eventos
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearUI();
        cancelState();
      }
      if (e.key === "p") {
        startBuild(BUILDINGS.path);
      }
      if (e.key === "Enter" && mode === "buildRoad") {
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clearUI, cancelState]);

  return (
    <main className="h-screen bg-blue-400 grid place-items-center">
      <Header />
      <div className="relative">
        <Grid cellSize={cellSize} />
        <GhostOverlay cellSize={cellSize} />
        <RoadGhostOverlay cellSize={cellSize} />
        <UIManager />
      </div>
    </main>
  );
}
