import type { BuildingEffect } from "./buildings";

export type TerrainObjectData = {
  id: number;
  name: string;
  cost: number;
  color: string;
  size: number;
  effects: BuildingEffect;
};

export const TERRAINOBJECTS: Record<string, TerrainObjectData> = {
  tree: {
    id: 0,
    name: "Arbol",
    cost: 1,
    color: "bg-green-400",
    size: 1,
    effects: {
      madera: 2,
    },
  },

  rock: {
    id: 1,
    name: "Roca",
    cost: 1,
    color: "bg-gray-400",
    size: 1,
    effects: {
      piedra: 2,
    },
  },
};
