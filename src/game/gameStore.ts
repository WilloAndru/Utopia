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
  buildStructure: (x: number, y: number, building: BuildingModel) => void;
  buildRoad: (path: { x: number; y: number }[]) => void;

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

  // Construccion de edificio
  buildStructure: (x, y, building) => {
    const { placeStructure } = get().grid;
    const { cancelState } = get().modeState;
    const { spendMoney } = get().economy;

    // Aplicamos el incremento de id, para identificar estructuras por separado
    const newBuilding = {
      ...building,
      id: get().buildings.increment(building.id),
    };

    spendMoney(building.cost);
    placeStructure(x, y, newBuilding);
    cancelState();
  },

  // Construccion de carretera
  buildRoad: (currentPath) => {
    const { placeRoad } = get().grid;
    const { buildData, cancelState } = get().modeState;
    const { spendMoney } = get().economy;

    spendMoney(buildData!.cost * currentPath.length);
    placeRoad(currentPath, buildData!);
    cancelState();
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
