import type { BuildingData } from "../data/buildings";

export type GameMode = "idle" | "build";

export type ModeState = {
  mode: GameMode;
  buildData: BuildingData | null;
  startBuild: (building: BuildingData) => void;
  cancelState: () => void;
};

export const createModeState = (set: any, get: any): ModeState => ({
  mode: "idle",
  buildData: null,

  startBuild: (building) => {
    set({
      modeState: { mode: "build", buildData: building },
    });
  },

  cancelState: () => {
    set({
      modeState: { mode: "idle", buildData: null },
    });
  },
});
