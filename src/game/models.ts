export type BuildingModel = {
  id: number;
  name: string;
  level?: number;
  cost: number;
  size: number;
  color: string;
  deletable?: boolean;
  usesInstanceId: boolean;
};

export type CellModel = {
  building: BuildingModel | null;
};

export type GameMode = "idle" | "build";
