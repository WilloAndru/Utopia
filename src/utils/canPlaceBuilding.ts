type Point = { x: number; y: number };
import type { CellModel } from "../game/models";

// Funcion para hallar si una de las celdas fantasma ya esta ocupada
function canPlace(
  path: Point[],
  size: number,
  isOccupied: (x: number, y: number) => boolean
): boolean {
  for (let i = path.length - 1; i >= 0; i--) {
    const c = path[i];

    for (let dx = 0; dx < size; dx++) {
      for (let dy = 0; dy < size; dy++) {
        const x = c.x + dx;
        const y = c.y + dy;

        if (isOccupied(x, y)) return false;
      }
    }
  }
  return true;
}

// Comparacion con celdas del grid ya puestas
export function canPlaceBuildingOnGrid(
  grid: CellModel[][],
  path: Point[],
  size: number
): boolean {
  return canPlace(path, size, (x, y) => Boolean(grid[x]?.[y]?.building));
}

// Comparacion con otras celdas fantasma, en el caso de road
export function canPlaceRoad(roadPath: Point[], path: Point[]): boolean {
  const roadSet = new Set(roadPath.map((p) => `${p.x},${p.y}`));

  return canPlace(path, 1, (x, y) => roadSet.has(`${x},${y}`));
}
