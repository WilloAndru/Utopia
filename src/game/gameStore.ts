import { create } from "zustand";
import type { Cell, GameState } from "./models";

// Crea una grilla del tamaño indicado y los atributos iniciales
function createGrid(size: number): Cell[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      building: null,
    }))
  );
}

// Crea el estado global del juego
export const useGameStore = create<GameState>(() => {
  const initialSize = 50;

  return {
    size: initialSize,
    grid: createGrid(initialSize),
    money: 1000,
  };
});
