import type { BuildingData } from "../data/buildings";

export type GameMode = "idle" | "build";

export type ModeState = {
  mode: GameMode;
  buildData: BuildingData | null;
  isSpaceFree: boolean;
  setIsSpaceFree: (value: boolean) => void;
  startBuild: (building: BuildingData) => void;
  cancelState: () => void;
};

export const createModeState = (set: any, get: any): ModeState => ({
  mode: "idle",
  buildData: null,
  isSpaceFree: false,

  setIsSpaceFree: (value) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        isSpaceFree: value,
      },
    }));
  },

  startBuild: (building) => {
    set((state: any) => ({
      modeState: { ...state.modeState, mode: "build", buildData: building },
    }));
  },

  cancelState: () => {
    set((state: any) => ({
      modeState: { ...state.modeState, mode: "idle", buildData: null },
    }));
  },
});
