import type { CellModel } from "../game/models";

export function getBuildingBorder(
  grid: CellModel[][],
  x: number,
  y: number
): string {
  const building = grid[x][y]?.building;
  if (!building) return "";

  // Comparamos que la celda vecina tenga el mismo nombre y el mismo id
  const sameBuilding = (nx: number, ny: number) => {
    const other = grid[nx]?.[ny]?.building;
    return other?.id === building.id && other?.name === building.name;
  };

  // Si la vecina no es del mismo edificio, entonces tiene borde
  return [
    !sameBuilding(x - 1, y) && "border-t",
    !sameBuilding(x + 1, y) && "border-b",
    !sameBuilding(x, y - 1) && "border-l",
    !sameBuilding(x, y + 1) && "border-r",
  ]
    .filter(Boolean)
    .join(" ");
}
