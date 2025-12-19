import type { BuildingData } from "../data/buildings";
import type { GameMode } from "./models";

export type ModeState = {
  mode: GameMode;
  buildData: BuildingData | null;
  startBuild: (building: BuildingData) => void;
  cancelState: () => void;
};

export const createModeState = (set: any, get: any): ModeState => ({
  mode: "idle",
  buildData: null,

  // Estado de constuccion
  startBuild: (building) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        mode: "build",
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
