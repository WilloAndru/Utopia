export type BuildingData = {
  id: number;
  name: string;
  cost: number;
  color: string;
  size: number;
  deletable: boolean;
};

export type BuildingsMap = {
  [key: string]: BuildingData;
};

export const BUILDINGS = {
  castle: {
    id: 0,
    name: "Castillo",
    cost: 0,
    color: "bg-emerald-300",
    size: 0,
    deletable: false,
  },

  path: {
    id: 1,
    name: "Camino",
    cost: 1,
    color: "bg-amber-300",
    size: 4,
    deletable: true,
  },

  house: {
    id: 2,
    name: "Casa",
    cost: 10,
    color: "bg-orange-300",
    size: 3,
    deletable: true,
  },

  tree: {
    id: 3,
    name: "Arbol",
    cost: 5,
    color: "bg-green-500",
    size: 2,
    deletable: true,
  },

  rock: {
    id: 4,
    name: "Roca",
    cost: 5,
    color: "bg-gray-400",
    size: 1,
    deletable: true,
  },
  rock1: {
    id: 4,
    name: "Roca",
    cost: 5,
    color: "bg-gray-400",
    size: 1,
    deletable: true,
  },
  rock2: {
    id: 4,
    name: "Roca",
    cost: 5,
    color: "bg-gray-400",
    size: 1,
    deletable: true,
  },
  rock3: {
    id: 4,
    name: "Roca",
    cost: 5,
    color: "bg-gray-400",
    size: 1,
    deletable: true,
  },
};
