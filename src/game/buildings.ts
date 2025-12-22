export type BuildingsState = {
  counts: Record<number, number>;
  increment: (typeId: number) => number;
  decrement: (typeId: number) => void;
};

export const createBuildings = (set: any, get: any): BuildingsState => ({
  counts: {},

  increment: (typeId: number) => {
    const quantity = get().buildings.counts[typeId] ?? 0; // Obtiene la cantidad de estructuras de ese tipo
    const nextId = quantity + 1;

    set((state: any) => ({
      buildings: {
        ...state.buildings,
        counts: {
          ...state.buildings.counts,
          [typeId]: nextId, // Cambia la cantidad a +1
        },
      },
    }));

    return nextId;
  },

  decrement: (typeId) =>
    set((state: any) => ({
      buildings: {
        ...state.buildings,
        counts: {
          ...state.buildings.counts,
          [typeId]: Math.max(0, (state.buildings.counts[typeId] ?? 0) - 1),
        },
      },
    })),
});
