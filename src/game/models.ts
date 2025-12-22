import type { BuildingEffect } from "../data/buildings";

export type BuildingModel = {
  id: number;
  name: string;
  level?: number;
  cost: number;
  workTime: number;
  color: string;
  size: number;
  deletable?: boolean;
  usesInstanceId?: boolean;
  effects?: BuildingEffect;
};

export type CellModel = {
  building: BuildingModel | null;
};

export type GameMode = "idle" | "build" | "buildRoad";
