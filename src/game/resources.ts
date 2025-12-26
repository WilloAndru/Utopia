import type { ResourceType } from "../data/buildings";

export type Resources = {
  money: number;
  poblacion: number;
  madera: number;
  piedra: number;
  spendMoney: (amount: number) => void;
  increasePopulation: (amount: number) => void;
  editMaterials: (
    materilas: Partial<Record<ResourceType, number>>[],
    isPlus: Boolean
  ) => void;
};

export const createResources = (set: any): Resources => ({
  money: 20,
  poblacion: 1,
  madera: 2,
  piedra: 2,

  // Funcion que gasta dinero
  spendMoney: (amount) =>
    set((state: any) => ({
      resources: {
        ...state.resources,
        money: state.resources.money - amount,
      },
    })),

  // Funcion que aumenta la poblacion
  increasePopulation: (amount) =>
    set((state: any) => ({
      resources: {
        ...state.resources,
        poblacion: state.resources.poblacion + amount,
      },
    })),

  // Funcion para gastar materiales
  editMaterials: (materials, isPlus) =>
    set((state: any) => {
      const resources = { ...state.resources };
      const factor = isPlus ? 1 : -1;

      materials.forEach((material) => {
        Object.entries(material).forEach(([key, value]) => {
          resources[key as ResourceType] += factor * value;
        });
      });

      return { resources };
    }),
});
