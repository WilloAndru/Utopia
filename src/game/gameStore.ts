import { create } from "zustand";
import { createGrid, type Grid } from "./grid";
import { createModeState, type ModeState } from "./mode";
import { createResources, type Resources } from "./resources";
import { createBuildings, type BuildingsState } from "./buildings";
import { createUI, type UIState } from "./ui";
import type { BuildingModel } from "./models";
import type { TerrainObjectData } from "../data/terrainObject";

export type GameState = {
  resources: Resources;
  grid: Grid;
  modeState: ModeState;
  ui: UIState;

  buildings: BuildingsState;
  deleteTerrainObject: (
    x: number,
    y: number,
    object: TerrainObjectData
  ) => void;
  buildStructure: (x: number, y: number, building: BuildingModel) => void;
  buildRoad: (path: { x: number; y: number }[]) => void;
};

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => ({
  resources: createResources(set),
  grid: createGrid(set, get),
  modeState: createModeState(set, get),
  buildings: createBuildings(set, get),
  ui: createUI(set, get),

  // Construccion de edificio
  buildStructure: (x, y, building) => {
    const { placeStructure } = get().grid;
    const { cancelState } = get().modeState;
    const { spendMoney, editMaterials, increasePopulation } = get().resources;

    // Aplicamos el incremento de id, para identificar estructuras por separado
    const newBuilding = {
      ...building,
      id: get().buildings.increment(building.id),
    };

    // Si de efecto aumenta la poblacion aumentamos la poblacion
    if (building.effects?.poblacion) {
      increasePopulation(building.effects.poblacion);
    }
    spendMoney(building.cost);
    editMaterials([building.requiredResources], true);
    placeStructure(x, y, newBuilding);
    cancelState();
  },

  // Eliminacion de obstaculo del terreno
  deleteTerrainObject: (x, y, terrainObject) => {
    const { deleteObject } = get().grid;
    const { clearUI } = get().ui;
    const { spendMoney, editMaterials } = get().resources;

    // Agregamos materiales extraidos
    if (terrainObject.effects) {
      editMaterials([terrainObject.effects], true);
    }

    deleteObject(x, y);
    spendMoney(terrainObject.cost);
    clearUI();
  },

  // Construccion de carretera
  buildRoad: (currentPath) => {
    const { placeRoad } = get().grid;
    const { buildData, cancelState } = get().modeState;
    const { spendMoney, editMaterials } = get().resources;

    // Pasamos la lista de materiales multiplicada por la longitud del path
    const scaledMaterials = Object.fromEntries(
      Object.entries(buildData!.requiredResources).map(([key, value]) => [
        key,
        value * currentPath.length,
      ])
    );

    spendMoney(buildData!.cost * currentPath.length);
    editMaterials([scaledMaterials], false);
    placeRoad(currentPath, buildData!);
    cancelState();
  },
}));
