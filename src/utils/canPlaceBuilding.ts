import type { Cell } from "../game/grid";

// Funcion para determinar si alguna de las celdas de la estructura fantasma ya esta ocupada con otra estrucutra
export function canPlaceBuilding(
  grid: Cell[][],
  size: number,
  startX: number,
  startY: number
): boolean {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cellX = startX + x;
      const cellY = startY + y;

      // Celda ocupada
      if (grid[cellX][cellY].building) return false;
    }
  }

  return true;
}
