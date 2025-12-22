export type BuildingData = {
  id: number;
  name: string;
  cost: number;
  workTime: number;
  color: string;
  size: number;
  deletable: boolean;
  usesInstanceId: boolean;
  requiredResources: Partial<Record<ResourceType, number>>;
};

type ResourceType = "madera" | "piedra";

export const resourceKeys: ResourceType[] = ["madera", "piedra"];

export const BUILDINGS: Record<string, BuildingData> = {
  castle: {
    id: 0,
    name: "Castillo",
    cost: 0,
    workTime: 0,
    color: "bg-emerald-300",
    size: 0,
    deletable: false,
    usesInstanceId: true,
    requiredResources: {},
  },

  path: {
    id: 1,
    name: "Camino",
    cost: 1,
    workTime: 10,
    color: "bg-gray-400",
    size: 1,
    deletable: true,
    usesInstanceId: false,
    requiredResources: {
      piedra: 1,
    },
  },

  house: {
    id: 2,
    name: "Casa",
    cost: 10,
    workTime: 30,
    color: "bg-orange-300",
    size: 1,
    deletable: true,
    usesInstanceId: true,
    requiredResources: {
      madera: 1,
      piedra: 1,
    },
  },
};
