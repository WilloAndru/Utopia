import type { BuildingEffect } from "../data/buildings";
import type { ResourceType } from "../data/buildings";
import type { TerrainObjectData } from "../data/terrainObject";

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
  building: BuildingModel | TerrainObjectData | null;
};

export type GameMode = "idle" | "build" | "buildRoad" | "edit";
