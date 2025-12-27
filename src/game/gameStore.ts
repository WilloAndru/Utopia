import { create } from "zustand";
import { createGrid, type Grid } from "./grid";
import { createModeState, type ModeState } from "./mode";
import { createResources, type Resources } from "./resources";
import { createBuildings, type BuildingsState } from "./buildings";
import { createUI, type UIState } from "./ui";
import type { BuildingModel } from "./models";
import type { TerrainObjectData } from "../data/terrainObject";

export type GameState = {
  month: number;
  resources: Resources;
  grid: Grid;
  modeState: ModeState;
  ui: UIState;
  buildings: BuildingsState;
  startTime: () => void;
  deleteTerrainObject: (
    x: number,
    y: number,
    object: TerrainObjectData
  ) => void;
  buildStructure: (x: number, y: number, building: BuildingModel) => void;
  deleteBuilding: (x: number, y: number, building: BuildingModel) => void;
  buildRoad: (path: { x: number; y: number }[]) => void;
  moveStructure: () => void;
};

let timeInterval: ReturnType<typeof setInterval> | null = null; // Para que nunca se reinicie el tiempo

// Crea el estado global del juego
export const useGameStore = create<GameState>((set, get) => ({
  month: 1,
  resources: createResources(set),
  grid: createGrid(set, get),
  modeState: createModeState(set, get),
  buildings: createBuildings(set, get),
  ui: createUI(set, get),

  // Contador de meses
  startTime: () => {
    const { setMessage } = get().ui;

    if (timeInterval) return;

    timeInterval = setInterval(() => {
      const { poblacion, editMoney } = get().resources;
      editMoney(poblacion, true);
      setMessage(`Has obtenido ${poblacion} de monedas`);

      set((state) => ({
        month: state.month + 1,
      }));
    }, 30000);
  },

  // Construccion de edificio
  buildStructure: (x, y, building) => {
    const { placeStructure } = get().grid;
    const { cancelState } = get().modeState;
    const { editMoney, editMaterials, increasePopulation } = get().resources;

    // Aplicamos el incremento de id, para identificar estructuras por separado
    const newBuilding = {
      ...building,
      id: get().buildings.increment(building.id),
    };

    // Si de efecto aumenta la poblacion aumentamos la poblacion
    if (building.effects?.poblacion) {
      increasePopulation(building.effects.poblacion);
      const { setMessage } = get().ui;
      setMessage(`Has aumentado la poblacion en ${building.effects.poblacion}`);
    }
    editMoney(building.cost, false);
    editMaterials([building.requiredResources], true);
    placeStructure(x, y, newBuilding);
    cancelState();
  },

  // Eliminacion de estructura
  deleteBuilding: (x, y, building) => {
    const { deleteObject } = get().grid;
    const { clearUI } = get().ui;
    const { editMaterials } = get().resources;

    // Eliminamos efectos que otorga
    if (building.effects) {
      editMaterials([building.effects], false);
    }

    deleteObject(x, y);
    clearUI();
  },

  // Eliminacion de obstaculo del terreno
  deleteTerrainObject: (x, y, terrainObject) => {
    const { deleteObject } = get().grid;
    const { clearUI } = get().ui;
    const { editMoney, editMaterials } = get().resources;

    // Agregamos materiales extraidos
    if (terrainObject.effects) {
      editMaterials([terrainObject.effects], true);
      const { setMessage } = get().ui;
      const effectsText = Object.entries(terrainObject.effects)
        .map(([resource, amount]) => `${amount} de ${resource}`)
        .join(", ");

      setMessage(`Has obtenido ${effectsText}`);
    }

    deleteObject(x, y);
    editMoney(terrainObject.cost, false);
    clearUI();
  },

  // Construccion de carretera
  buildRoad: (currentPath) => {
    const { placeRoad } = get().grid;
    const { buildData, cancelState } = get().modeState;
    const { editMoney, editMaterials } = get().resources;

    // Pasamos la lista de materiales multiplicada por la longitud del path
    const scaledMaterials = Object.fromEntries(
      Object.entries(buildData!.requiredResources).map(([key, value]) => [
        key,
        value * currentPath.length,
      ])
    );

    editMoney(buildData!.cost * currentPath.length, false);
    editMaterials([scaledMaterials], false);
    placeRoad(currentPath, buildData!);
    cancelState();
  },

  // Confirmamos mover la estructura
  moveStructure: () => {
    const { placeStructure, deleteObject } = get().grid;
    const { posEdit, hoverCell, buildData, cancelState } = get().modeState;

    let newBuilding = buildData!;
    if (buildData?.name !== "Camino") {
      newBuilding = {
        ...buildData!,
        id: get().buildings.increment(buildData!.id),
      };
    }

    placeStructure(hoverCell!.x, hoverCell!.y, newBuilding);
    deleteObject(posEdit!.x, posEdit!.y);
    cancelState();
  },
}));
