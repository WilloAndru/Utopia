export type BuildingsState = {
  counts: Record<number, number>;
  increment: (typeId: number) => number;
  decrement: (typeId: number) => void;
};

export const createBuildings = (set: any, get: any): BuildingsState => ({
  counts: {},

  increment: (typeId: number) => {
    const current = get().buildings.counts[typeId] ?? 0;
    const nextId = current + 1;

    set((state: any) => ({
      buildings: {
        ...state.buildings,
        counts: {
          ...state.buildings.counts,
          [typeId]: nextId,
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
