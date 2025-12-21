import { BUILDINGS } from "../data/buildings";
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
});
