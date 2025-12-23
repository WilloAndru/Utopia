export type Resources = {
  money: number;
  poblacion: number;
  madera: number;
  piedra: number;
  spendMoney: (amount: number) => void;
  increasePopulation: (amount: number) => void;
};

export const createResources = (set: any): Resources => ({
  money: 10,
  poblacion: 1,
  madera: 0,
  piedra: 1,

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
});
