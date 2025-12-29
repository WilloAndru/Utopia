import type { BuildingData } from "../data/buildings";
import type { GameMode } from "./models";

export type mode = {
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

  posEdit: { x: number; y: number } | null;
  startEdit: (x: number, y: number, building: BuildingData) => void;

  cancelState: () => void;
};

export const createmode = (set: any, get: any): mode => ({
  mode: "idle",
  buildData: null,

  // Establece si la construccion es disponible
  isAvailable: { value: true },
  setIsAvailable: (available) =>
    set((state: any) => {
      if (state.mode.isAvailable === available) return state;
      return {
        mode: {
          ...state.mode,
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
      mode: {
        ...state.mode,
        hoverCell: { x, y },
      },
    }));
  },

  // Establece el path fantasma hoverado
  previewPath: null,
  setPreviewPath: (path) => {
    set((state: any) => ({
      mode: {
        ...state.mode,
        previewPath: path,
      },
    }));
  },

  // Establece el path fantasma luego de hacer el segundo click
  roadPath: [],
  setRoadPath: (path) => {
    set((state: any) => ({
      mode: {
        ...state.mode,
        roadPath: [...state.mode.roadPath, ...path],
      },
    }));
  },

  // Estado de constuccion
  startBuild: (building) => {
    set((state: any) => ({
      mode: {
        ...state.mode,
        mode: "build",
        buildData: building,
      },
    }));
  },

  // Estado de construccion de camino
  startRoadBuild: (building) => {
    set((state: any) => ({
      mode: {
        ...state.mode,
        mode: "buildRoad",
        buildData: building,
      },
    }));
  },

  posEdit: null,
  // Estado de edicion
  startEdit: (x, y, building) => {
    set((state: any) => ({
      mode: {
        ...state.mode,
        posEdit: { x, y },
        mode: "edit",
        buildData: building,
      },
    }));
  },

  // Cancelamos cualquier estado
  cancelState: () => {
    set((state: any) => ({
      mode: {
        ...state.mode,
        mode: "idle",
        buildData: null,
        hoverCell: null,
        previewPath: null,
        roadPath: [],
        isAvailable: true,
        posEdit: null,
      },
    }));
  },
});
