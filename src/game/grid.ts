import { BUILDINGS } from "../data/buildings";
import { TERRAINOBJECTS } from "../data/terrainObject";
import type { CellModel, BuildingModel } from "./models";

export type Grid = {
  grid: CellModel[][];
  placeStructure: (
    startX: number,
    startY: number,
    building: BuildingModel
  ) => void;
  placeRoad: (
    path: { x: number; y: number }[],
    building: BuildingModel
  ) => void;
  deleteObject: (startX: number, startY: number) => void;
};

export const createGrid = (set: any, get: any): Grid => ({
  // Creamos la grilla inicial
  grid: (() => {
    // Creamos la grilla vacia
    const size = 50;
    const grid: CellModel[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        building: null,
      }))
    );

    // Creamos el castillo en el centro
    const castleData = BUILDINGS.castle;
    const castleSize = 6;
    const start = Math.floor(size / 2) - Math.floor(castleSize / 2); // Pos inicial
    const end = start + castleSize; // Pos final
    for (let x = start; x < end; x++) {
      for (let y = start; y < end; y++) {
        // Ignoramos las esquinas
        const isCorner =
          (x === start && y === start) ||
          (x === start && y === end - 1) ||
          (x === end - 1 && y === start) ||
          (x === end - 1 && y === end - 1);

        if (!isCorner) {
          grid[x][y].building = {
            ...castleData,
            level: 1,
          };
        }
      }
    }

    // Creamos los recursos iniciales
    const freeCoords = [];
    for (let x = 0; x < size; x++) {
      // Creamos una lista con las coordenadas no coupadas por el castillo
      for (let y = 0; y < size; y++) {
        if (!grid[x][y].building) {
          freeCoords.push({ x, y });
        }
      }
    }

    // Fisher–Yates sobre coordenadas para obtenerlas aleatorias
    for (let i = freeCoords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [freeCoords[i], freeCoords[j]] = [freeCoords[j], freeCoords[i]];
    }

    // Colocamos 30 recursos, la mitad arboles la otra rocas
    const resourceCount = 30;
    for (let i = 0; i < resourceCount; i++) {
      const { x, y } = freeCoords[i];
      const buildData =
        i < resourceCount / 2 ? TERRAINOBJECTS.tree : TERRAINOBJECTS.rock;
      grid[x][y].building = {
        ...buildData,
      };
    }

    return grid;
  })(),

  // Modificamos la grilla con la info de la nueva estructura
  placeStructure: (startX, startY, building) =>
    set((state: any) => {
      const newGrid = state.grid.grid.map((row: CellModel[]) =>
        row.map((cell) => ({ ...cell }))
      );

      for (let x = startX; x < startX + building.size; x++) {
        for (let y = startY; y < startY + building.size; y++) {
          newGrid[x][y].building = building;
        }
      }

      return {
        grid: {
          ...state.grid,
          grid: newGrid,
        },
      };
    }),

  // Modificamos la grilla con la info del nuevo camino
  placeRoad: (path, building) =>
    set((state: any) => {
      const newGrid = state.grid.grid.map((row: CellModel[]) =>
        row.map((cell) => ({ ...cell }))
      );

      path.map((cell) => {
        newGrid[cell.x][cell.y].building = building;
      });

      return {
        grid: {
          ...state.grid,
          grid: newGrid,
        },
      };
    }),

  // Eliminamos obstaculo
  deleteObject: (startX, startY) =>
    set((state: any) => {
      const newGrid = state.grid.grid.map((row: CellModel[]) =>
        row.map((cell) => ({ ...cell }))
      );

      newGrid[startX][startY].building = null;

      return {
        grid: {
          ...state.grid,
          grid: newGrid,
        },
      };
    }),
});
