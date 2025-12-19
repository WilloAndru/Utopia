import type { BuildingData } from "../data/buildings";
import type { GameMode } from "./models";

export type ModeState = {
  mode: GameMode;
  buildData: BuildingData | null;
  startBuild: (building: BuildingData) => void;
  startRoadBuild: (building: BuildingData) => void;
  cancelState: () => void;
};

export const createModeState = (set: any, get: any): ModeState => ({
  mode: "idle",
  buildData: null,

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
