import type { ResourceType } from "../data/buildings";

export type Resources = {
  money: number;
  poblacion: number;
  madera: number;
  piedra: number;
  spendMoney: (amount: number) => void;
  increasePopulation: (amount: number) => void;
  spendMaterials: (materilas: Partial<Record<ResourceType, number>>[]) => void;
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
  spendMaterials: (materials) =>
    set((state: any) => {
      const resources = { ...state.resources };

      materials.forEach((material) => {
        Object.entries(material).forEach(([key, value]) => {
          resources[key as ResourceType] -= value!;
        });
      });

      return { resources };
    }),
});
