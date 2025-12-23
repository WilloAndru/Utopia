import type { BuildingEffect } from "../data/buildings";
import type { ResourceType } from "../data/buildings";

export type BuildingModel = {
  id: number;
  name: string;
  level?: number;
  cost: number;
  color: string;
  size: number;
  deletable?: boolean;
  usesInstanceId?: boolean;
  requiredResources: Partial<Record<ResourceType, number>>;
  effects?: BuildingEffect;
};

export type CellModel = {
  building: BuildingModel | null;
};

export type GameMode = "idle" | "build" | "buildRoad";
