import type { BuildingData } from "../data/buildings";
import type { GameMode } from "./models";

export type ModeState = {
  mode: GameMode;
  buildData: BuildingData | null;

  hoverCell: { x: number; y: number } | null;
  setHoverCell: (x: number, y: number) => void;

  hoverPath: { x: number; y: number }[] | null;
  setHoverPath: (path: { x: number; y: number }[]) => void;

  startBuild: (building: BuildingData) => void;
  startRoadBuild: (building: BuildingData) => void;
  cancelState: () => void;
};

export const createModeState = (set: any, get: any): ModeState => ({
  mode: "idle",
  buildData: null,

  hoverCell: null,
  hoverPath: null,

  // Establece la celda hoverada en el modo de construccion
  setHoverCell: (x, y) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        hoverCell: { x, y },
      },
    }));
  },

  // Establece las celdas hoveradas en el modo de construccion de camino
  setHoverPath: (path) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        hoverPath: path,
      },
    }));
  },

  // Estado de constuccion
  startBuild: (building: BuildingData) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        mode: "build",
        buildData: building,
      },
    }));
  },

  // Estado de construccion de camino
  startRoadBuild: (building: BuildingData) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        mode: "buildRoad",
        buildData: building,
      },
    }));
  },

  // Cancelamos cualquier estado
  cancelState: () => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        mode: "idle",
        buildData: null,
      },
    }));
  },
});
