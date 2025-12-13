export type BuildingType = "house" | "factory";

export type Building = {
  type: BuildingType;
  level: number;
};

// Que contiene una celda
export type Cell = {
  building: Building | null;
};

// Variables globales y metodos del juego
export type GameState = {
  // Datos del juego
  size: number;
  grid: Cell[][];
  money: number;
};
