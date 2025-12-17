export function getGhostBuildingBorder(
  ghostCells: { x: number; y: number }[],
  x: number,
  y: number
): string {
  const has = (cx: number, cy: number) =>
    ghostCells.some((c) => c.x === cx && c.y === cy);

  const top = has(x - 1, y);
  const bottom = has(x + 1, y);
  const left = has(x, y - 1);
  const right = has(x, y + 1);

  return [
    !top && "border-t",
    !bottom && "border-b",
    !left && "border-l",
    !right && "border-r",
  ]
    .filter(Boolean)
    .join(" ");
}
