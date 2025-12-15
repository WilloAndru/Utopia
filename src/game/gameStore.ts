import { create } from "zustand";
import { createGrid } from "./grid";
import type { Cell } from "./grid";

export type GameState = {
  grid: Cell[][];
  money: number;

  idOpenUI: number | null;
  typeOpenUI: string | null;

  openUI: (id: number, name: string) => void;
  clearUI: () => void;
};

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => ({
  grid: createGrid(),
  money: 1000,

  idOpenUI: null,
  typeOpenUI: null,

  // Abre o cierra la interfaz según el edificio clickeado
  openUI: (id, name) => {
    const { idOpenUI } = get();

    // Si se hace click en el mismo edificio → toggle (cerrar)
    if (idOpenUI === id) {
      set({
        idOpenUI: null,
        typeOpenUI: null,
      });
      return;
    }

    // Si es otro edificio → abrir su interfaz
    set({
      idOpenUI: id,
      typeOpenUI: name,
    });
  },

  // Cierra cualquier interfaz abierta
  clearUI: () => {
    set({
      idOpenUI: null,
      typeOpenUI: null,
    });
  },
}));
