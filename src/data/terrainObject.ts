export type TerrainObjectData = {
  id: number;
  name: string;
  cost: number;
  workTime: number;
  color: string;
  size: number;
};

export const TERRAINOBJECTS: Record<string, TerrainObjectData> = {
  tree: {
    id: 0,
    name: "Arbol",
    workTime: 10,
    cost: 1,
    color: "bg-green-400",
    size: 1,
  },

  rock: {
    id: 1,
    name: "Roca",
    workTime: 20,
    cost: 1,
    color: "bg-gray-500",
    size: 1,
  },
};
