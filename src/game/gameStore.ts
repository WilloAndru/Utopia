import { create } from "zustand";
import { createGrid, type Grid } from "./grid";
import { createModeState, type ModeState } from "./mode";
import { createEconomy, type Economy } from "./economy";
import { createBuildings, type BuildingsState } from "./buildings";
import type { BuildingModel } from "./models";

export type GameState = {
  economy: Economy;
  grid: Grid;
  modeState: ModeState;
  buildings: BuildingsState;

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
  buildings: createBuildings(set, get),

  idOpenUI: null,
  typeOpenUI: null,

  hoverCell: null,

  // Cuando se construye un edificio
  buildStructure: (x, y, building) => {
    const { placeStructure } = get().grid;
    const { cancelState } = get().modeState;
    const { spendMoney } = get().economy;
    const newId = get().buildings.increment(building.id);

    const newBuilding = {
      ...building,
      id: newId,
    };

    spendMoney(building.cost);
    placeStructure(x, y, newBuilding);
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
