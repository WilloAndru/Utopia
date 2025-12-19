// Funcion para obtener los bordes de los caminos en el modo de buildRoad
export function getRoadGhostBorders(
  path: { x: number; y: number }[],
  cell: { x: number; y: number }
) {
  const has = (dx: number, dy: number) =>
    path.some((c) => c.x === cell.x + dx && c.y === cell.y + dy);

  const top = !has(-1, 0);
  const bottom = !has(1, 0);
  const left = !has(0, -1);
  const right = !has(0, 1);

  return `
    ${top ? "border-t" : "border-t-0"}
    ${bottom ? "border-b" : "border-b-0"}
    ${left ? "border-l" : "border-l-0"}
    ${right ? "border-r" : "border-r-0"}
  `;
}
