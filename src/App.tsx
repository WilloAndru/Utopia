import Header from "./components/Header";
import Grid from "./components/Grid";
import BuildingUI from "./interfaces/BuildingUI";
import { useGameStore } from "./game/gameStore";
import { useEffect } from "preact/hooks";

export function App() {
  const clearInterfaces = useGameStore((s) => s.clearInterfaces);

  // Detecta cuando se usa Esc para cerrar interfaces
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterfaces();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clearInterfaces]);

  return (
    <main className="flex justify-center items-center h-screen bg-blue-400">
      <Header />
      <Grid />
      <BuildingUI />
    </main>
  );
}
