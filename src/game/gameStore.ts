import { create } from "zustand";
import { createGrid } from "./grid";
import type { Cell } from "./grid";
import { createModeState } from "./mode";
import type { ModeState } from "./mode";

export type GameState = {
  grid: Cell[][];
  money: number;

  modeState: ModeState;

  hoverCell: { x: number; y: number } | null;
  setHoverCell: (x: number, y: number) => void;

  idOpenUI: number | null;
  typeOpenUI: string | null;
  openUI: (id: number, name: string) => void;
  clearUI: () => void;
};

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => ({
  grid: createGrid(),
  money: 8,

  modeState: createModeState(set, get),

  idOpenUI: null,
  typeOpenUI: null,

  hoverCell: null,
  // Establece la celda hoverada en el modo de construccion
  setHoverCell: (x, y) => {
    set({
      hoverCell: { x, y },
    });
  },

  // Abre o cierra la interfaz según el edificio clickeado
  openUI: (id: number, name: string) => {
    const { idOpenUI, modeState } = get();

    // Si ya hay un estado activo, lo cerramos
    if (modeState.mode !== "idle") {
      modeState.cancelState();
    }

    // Si se hace click en el mismo edificio → toggle (cerrar)
    if (idOpenUI === id) {
      set({
        idOpenUI: null,
        typeOpenUI: null,
      });
      return;
    }

    // Si es otro edificio → abrir su interfaz
    set({
      idOpenUI: id,
      typeOpenUI: name,
    });
  },

  // Cierra cualquier interfaz abierta
  clearUI: () => {
    set({
      idOpenUI: null,
      typeOpenUI: null,
    });
  },
}));
