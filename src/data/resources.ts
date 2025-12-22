export type BuildingData = {
  id: number;
  name: string;
  cost: number;
  color: string;
  size: number;
};

export const BUILDINGS: Record<string, BuildingData> = {
  tree: {
    id: 0,
    name: "Arbol",
    cost: 1,
    color: "bg-green-300",
    size: 4,
  },

  rock: {
    id: 1,
    name: "Roca",
    cost: 5,
    color: "bg-gray-500",
    size: 1,
  },
};
