export type BuildingData = {
  id: number;
  name: string;
  cost: number;
  color: string;
  size: number;
  deletable: boolean;
  usesInstanceId: boolean;
};

export const BUILDINGS: Record<string, BuildingData> = {
  castle: {
    id: 0,
    name: "Castillo",
    cost: 0,
    color: "bg-emerald-300",
    size: 0,
    deletable: false,
    usesInstanceId: true,
  },

  path: {
    id: 1,
    name: "Camino",
    cost: 1,
    color: "bg-gray-400",
    size: 1,
    deletable: true,
    usesInstanceId: false,
  },

  house: {
    id: 2,
    name: "Casa",
    cost: 10,
    color: "bg-orange-300",
    size: 1,
    deletable: true,
    usesInstanceId: true,
  },

  tree: {
    id: 3,
    name: "Arbol",
    cost: 1,
    color: "bg-green-300",
    size: 4,
    deletable: true,
    usesInstanceId: true,
  },

  rock: {
    id: 4,
    name: "Roca",
    cost: 5,
    color: "bg-gray-500",
    size: 1,
    deletable: true,
    usesInstanceId: true,
  },
  // rock1: {
  //   id: 4,
  //   name: "Roca",
  //   cost: 5,
  //   color: "bg-gray-400",
  //   size: 1,
  //   deletable: true,
  // },
  // rock2: {
  //   id: 4,
  //   name: "Roca",
  //   cost: 5,
  //   color: "bg-gray-400",
  //   size: 1,
  //   deletable: true,
  // },
  // rock3: {
  //   id: 4,
  //   name: "Roca",
  //   cost: 5,
  //   color: "bg-gray-400",
  //   size: 1,
  //   deletable: true,
  // },
};
