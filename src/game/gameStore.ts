import { create } from "zustand";
import { createGrid } from "./grid";
import type { Cell } from "./grid";

export type GameState = {
  grid: Cell[][];
  money: number;
};

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => {
  return {
    grid: createGrid(),
    money: 1000,
  };
});
