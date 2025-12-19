import type { CellModel } from "../game/models";

// Funcion para generar los strings de los border con borde de las estructuras
export function getBuildingBorder(
  grid: CellModel[][],
  x: number,
  y: number
): string {
  const cell = grid[x][y];
  if (!cell.building) return ""; // Si la celda no es una estructura no devolvemos borde

  const id = cell.building.id;

  // Si es false significa que la celda vecina no es del mismo edificio, entonces es una celda con borde
  const top = grid[x - 1]?.[y].building?.id === id;
  const bottom = grid[x + 1]?.[y].building?.id === id;
  const left = grid[x]?.[y - 1].building?.id === id;
  const right = grid[x]?.[y + 1].building?.id === id;

  return [
    !top && "border-t",
    !bottom && "border-b",
    !left && "border-l",
    !right && "border-r",
  ]
    .filter(Boolean) // Quitamos los boleanos
    .join(" "); // Devolvemos string en formato tailwind
}
