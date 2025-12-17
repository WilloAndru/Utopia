// Funcion que devulve las celdas subyacentes de la estructura en el modo de construccion
export function ghostCells(
  hoverCell: { x: number; y: number } | null,
  size: number | null
) {
  if (!hoverCell || !size) return [];
  const { x, y } = hoverCell;

  const cells = [];

  for (let dx = 0; dx < size; dx++) {
    for (let dy = 0; dy < size; dy++) {
      cells.push({ x: x + dx, y: y + dy });
    }
  }

  return cells;
}
