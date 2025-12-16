export const BUILDINGS = {
  castle: {
    id: 0,
    name: "Castillo",
    cost: 0,
    color: "bg-emerald-300",
    description: "",
    size: 0,
    deletable: false,
  },

  path: {
    id: 1,
    name: "Camino",
    cost: 1,
    color: "bg-amber-300",
    description: "Camino para conectar distintas estructuras.",
    size: 3,
    deletable: true,
  },

  house: {
    id: 2,
    name: "Casa",
    cost: 10,
    color: "bg-orange-300",
    description: "Vivienda para aumentar la población.",
    size: 2,
    deletable: true,
  },

  tree: {
    id: 3,
    name: "Arbol",
    cost: 1,
    color: "bg-green-500",
    description: "Árbol que permite obtener madera.",
    size: 2,
    deletable: true,
  },

  rock: {
    id: 4,
    name: "Roca",
    cost: 1,
    color: "bg-gray-400",
    description: "Roca que permite obtener piedra.",
    size: 1,
    deletable: true,
  },

  rock2: {
    id: 4,
    name: "Rock",
    cost: 1,
    color: "bg-gray-400",
    description: "",
    size: 2,
    deletable: true,
  },
};
