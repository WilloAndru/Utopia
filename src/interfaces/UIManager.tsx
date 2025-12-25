import { useRef, useEffect } from "preact/hooks";
import { useGameStore } from "../game/gameStore";
import MainMenu from "./main/MainMenu";
import ResourceUI from "./resources/ResourceUI";

type UIManagerProps = {
  cellSize: number;
};

export default function UIManager({ cellSize }: UIManagerProps) {
  const { idOpenUI, nameUI, clearUI } = useGameStore((s) => s.ui);
  const uiRef = useRef<HTMLDivElement>(null);

  // Detecta click en el DOM, para cerrar o mantener la interfaz
  useEffect(() => {
    if (!nameUI) return; // Si no hay interfaz activa no se hace nada

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Click dentro de la UI
      if (uiRef.current?.contains(target)) return;

      // Click en un trigger (para que botones que tambien abran la interfaz no bugeen)
      if (target.closest("[data-ui-trigger]")) return;

      // Click en cualquier otro lugar => cerrar
      clearUI();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [nameUI]);

  if (!nameUI) return null; // Si no hay interfaz activa no devulve nada

  // Dependiendo del nombre de la UI muestra la interfaz correspondiente
  let content = null;
  switch (nameUI) {
    case "Castillo":
      content = <MainMenu />;
      break;
    case "Arbol":
    case "Roca":
      content = <ResourceUI name={nameUI} cellSize={cellSize} />;
      break;
  }

  return <aside ref={uiRef}>{content}</aside>;
}
