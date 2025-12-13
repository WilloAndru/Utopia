export type BuildingType = "house" | "factory";

export type Building = {
  type: BuildingType;
  level: number;
};

export type Cell = {
  building: Building | null;
};

// Describe cómo se ve y qué contiene todo el estado del juego
export type GameState = {
  // Guarda el tamaño del mapa (ejemplo: 50 para un mapa 50x50)
  size: number;

  // Guarda la grilla completa del juego, celda por celda
  grid: Cell[][];

  // Guarda el edificio que el jugador tiene seleccionado
  selectedBuilding: BuildingType | null;

  // Agrupa los recursos del jugador
  resources: {
    // Cantidad de dinero disponible
    money: number;
  };

  // Función que crea o reinicia la grilla según el tamaño dado
  initGrid: (size: number) => void;

  // Función para elegir qué tipo de edificio se va a construir
  selectBuilding: (type: BuildingType | null) => void;

  // Función que coloca un edificio en una posición del mapa
  placeBuilding: (x: number, y: number) => void;
};
