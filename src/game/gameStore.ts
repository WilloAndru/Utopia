import { create } from "zustand";
import { createGrid } from "./grid";
import { createModeState } from "./mode";
import type { ModeState } from "./mode";
import type { Grid } from "./grid";
import { createEconomy, type Economy } from "./economy";
import type { BuildingModel } from "./grid";

export type GameState = {
  economy: Economy;
  grid: Grid;
  modeState: ModeState;

  hoverCell: { x: number; y: number } | null;
  setHoverCell: (x: number, y: number) => void;

  buildStructure: (x: number, y: number, building: BuildingModel) => void;

  idOpenUI: number | null;
  typeOpenUI: string | null;
  openUI: (id: number, name: string) => void;
  clearUI: () => void;
};

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => ({
  economy: createEconomy(set),
  grid: createGrid(set, get),
  modeState: createModeState(set, get),

  idOpenUI: null,
  typeOpenUI: null,

  hoverCell: null,

  // Cuando se construye un edificio
  buildStructure: (x, y, building) => {
    const { placeStructure } = get().grid;
    const { cancelState } = get().modeState;
    const { spendMoney } = get().economy;

    spendMoney(building.cost);
    placeStructure(x, y, building);
    cancelState();
  },

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
