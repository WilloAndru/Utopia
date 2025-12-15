import { create } from "zustand";
import { createGrid } from "./grid";
import type { Cell } from "./grid";

export type GameState = {
  grid: Cell[][];
  money: number;

  typeOpenUI: string | null;

  openUI: (name: string) => void;
  clearInterfaces: () => void;
};

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => {
  return {
    grid: createGrid(),
    money: 1000,
    typeOpenUI: null,

    // Cuando se le click a una estructura muestra interfaz
    openUI: (name) => {
      set({
        typeOpenUI: name,
      });
    },

    // Oculta todas las interfaces
    clearInterfaces: () => {
      set({
        typeOpenUI: null,
      });
    },
  };
});
