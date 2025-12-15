import { useRef, useEffect } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import MainMenu from "./MainMenu";

export default function BuildingUI() {
  const nameUI = useGameStore((s) => s.typeOpenUI);
  const clearInterface = useGameStore((s) => s.clearInterfaces);
  const uiRef = useRef<HTMLDivElement>(null);

  // Detecta click fuera de la interfaz => cierra interfaz
  useEffect(() => {
    if (!nameUI) return; // Si no hay interfaz activa no se hace nada

    // Si el click no fue dentro de la interfaz, se cierra
    const handleClickOutside = (e: MouseEvent) => {
      if (uiRef.current && !uiRef.current.contains(e.target as Node)) {
        clearInterface();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [nameUI]);

  if (!nameUI) return null;

  let content = null;

  switch (nameUI) {
    case "Castle":
      content = <MainMenu />;
      break;
  }

  return <aside ref={uiRef}>{content}</aside>;
}
