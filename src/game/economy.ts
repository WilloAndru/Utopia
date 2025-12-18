export type Economy = {
  money: number;
  spendMoney: (amount: number) => void;
};

export const createEconomy = (set: any): Economy => ({
  money: 8,

  // Funcion que gasta dinero
  spendMoney: (amount) =>
    set((state: any) => ({
      economy: {
        ...state.economy,
        money: state.economy.money - amount,
      },
    })),
});
