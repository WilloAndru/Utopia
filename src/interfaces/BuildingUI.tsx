import { useRef, useEffect } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import MainMenu from "./MainMenu";

export default function BuildingUI() {
  const nameUI = useGameStore((s) => s.typeOpenUI);
  const clearInterface = useGameStore((s) => s.clearInterfaces);
  const uiRef = useRef<HTMLDivElement>(null);

  // Detecta click en el DOM, para cerrar o mantener la interfaz
  useEffect(() => {
    if (!nameUI) return; // Si no hay interfaz activa no se hace nada

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Click dentro de la UI
      if (uiRef.current?.contains(target)) return;

      // Click en un trigger
      if (target.closest("[data-ui-trigger]")) return;

      // Click en cualquier otro lugar => cerrar
      clearInterface();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
