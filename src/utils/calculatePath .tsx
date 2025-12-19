export function calculatePath(
  start: { x: number; y: number },
  end: { x: number; y: number }
) {
  const path = [];
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    const step = dx > 0 ? 1 : -1;
    for (let x = start.x; x !== end.x + step; x += step)
      path.push({ x, y: start.y });
  } else {
    const step = dy > 0 ? 1 : -1;
    for (let y = start.y; y !== end.y + step; y += step)
      path.push({ x: start.x, y });
  }
  return path;
}
