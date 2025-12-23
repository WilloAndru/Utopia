import type { BuildingData } from "../data/buildings";
import type { GameMode } from "./models";

export type ModeState = {
  mode: GameMode;
  buildData: BuildingData | null;

  isAvailable: { message?: string; value: boolean };
  setIsAvailable: (available: { message?: string; value: boolean }) => void;

  hoverCell: { x: number; y: number } | null;
  setHoverCell: (x: number, y: number) => void;

  previewPath: { x: number; y: number }[] | null;
  setPreviewPath: (path: { x: number; y: number }[] | null) => void;

  roadPath: { x: number; y: number }[];
  setRoadPath: (path: { x: number; y: number }[]) => void;

  startBuild: (building: BuildingData) => void;
  startRoadBuild: (building: BuildingData) => void;
  cancelState: () => void;
};

export const createModeState = (set: any, get: any): ModeState => ({
  mode: "idle",
  buildData: null,

  // Establece si la construccion es disponible
  isAvailable: { value: true },
  setIsAvailable: (available) =>
    set((state: any) => {
      if (state.modeState.isAvailable === available) return state;
      return {
        modeState: {
          ...state.modeState,
          isAvailable: {
            message: available.message,
            value: available.value,
          },
        },
      };
    }),

  // Establece la celda hoverada en el modo de construccion
  hoverCell: null,
  setHoverCell: (x, y) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        hoverCell: { x, y },
      },
    }));
  },

  // Establece el path fantasma hoverado
  previewPath: null,
  setPreviewPath: (path) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        previewPath: path,
      },
    }));
  },

  // Establece el path fantasma luego de hacer el segundo click
  roadPath: [],
  setRoadPath: (path) => {
    set((state: any) => ({
      modeState: {
        ...state.modeState,
        roadPath: [...state.modeState.roadPath, ...path],
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
        hoverCell: null,
        previewPath: null,
        roadPath: [],
        isAvailable: true,
      },
    }));
  },
});
