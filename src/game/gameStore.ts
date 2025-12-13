import { create } from "zustand";
import type { Cell, GameState } from "./models";

// Función que crea la cuadrícula del juego
function createGrid(size: number): Cell[][] {
  // Devuelve una lista de filas
  return Array.from({ length: size }, () =>
    // Cada fila es otra lista con la misma cantidad de celdas
    Array.from({ length: size }, () =>
      // Cada celda empieza vacía, sin ningún edificio
      ({ building: null })
    )
  );
}

// Crea y exporta el estado global del juego
export const useGameStore = create<GameState>((set, get) => ({
  // Guarda el tamaño actual del mapa
  size: 0,

  // Guarda la grilla del juego (todas las celdas)
  grid: [],

  // Guarda el edificio que el jugador tiene seleccionado
  selectedBuilding: null,

  // Guarda los recursos del jugador
  resources: {
    // Dinero inicial del jugador
    money: 1000,
  },

  // Crea o reinicia la grilla del juego con un tamaño dado
  initGrid: (size) => {
    // Actualiza el tamaño y crea una grilla nueva
    set({
      size,
      grid: createGrid(size),
    });
  },

  // Cambia el edificio que el jugador quiere construir
  selectBuilding: (type) => {
    // Guarda el tipo de edificio seleccionado
    set({ selectedBuilding: type });
  },

  // Intenta colocar un edificio en una posición del mapa
  placeBuilding: (x, y) => {
    // Obtiene el estado actual del juego
    const { grid, selectedBuilding, resources } = get();

    // Si no hay edificio seleccionado, no hace nada
    if (!selectedBuilding) return;

    // Si la posición no existe en la grilla, no hace nada
    if (!grid[x] || !grid[x][y]) return;

    // Si ya hay un edificio en esa celda, no hace nada
    if (grid[x][y].building) return;

    // Si no hay suficiente dinero, no hace nada
    if (resources.money < 100) return;

    // Crea una nueva grilla copiando la anterior
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) =>
        // Solo cambia la celda donde se colocó el edificio
        i === x && j === y
          ? { building: { type: selectedBuilding, level: 1 } }
          : cell
      )
    );

    // Actualiza el estado del juego
    set({
      // Guarda la nueva grilla con el edificio colocado
      grid: newGrid,

      // Resta el dinero usado para construir
      resources: {
        money: resources.money - 100,
      },
    });
  },
}));
