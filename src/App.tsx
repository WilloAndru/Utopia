import Header from "./components/Header";
import Grid from "./components/Grid";
import UIManager from "./interfaces/UIManager";
import { useGameStore } from "./game/gameStore";
import { useEffect } from "preact/hooks";
import GhostOverlay from "./components/GhostOverlay";

export function App() {
  const clearUI = useGameStore((s) => s.clearUI);
  const { cancelState } = useGameStore((s) => s.modeState);

  // Detecta cuando se usa Esc para cerrar interfaces o eventos
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearUI();
        cancelState();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clearUI]);

  return (
    <main className="h-screen bg-blue-400 grid place-items-center">
      <Header />
      <div className="relative">
        <Grid />
        <GhostOverlay />
        <UIManager />
      </div>
    </main>
  );
}
