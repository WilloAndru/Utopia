export type Building = {
  name: string;
  level: number;
  cost: number;
  color: string;
  undeletable: boolean;
};

export type Cell = {
  building: Building | null;
};

// Creacion de las celdas
export function createGrid(): Cell[][] {
  // Creamos la grilla vacia
  const size = 80;
  const grid: Cell[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      building: null,
    }))
  );

  // Creamos el castillo en el centro
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
          name: "Castle",
          level: 1,
          cost: 0,
          color: "bg-yellow-300",
          undeletable: true,
        };
      }
    }
  }

  return grid;
}
