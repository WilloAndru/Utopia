export type UIState = {
  idOpenUI: number | null;
  nameUI: string | null;
  message: string | null;
  setMessage: (value: string | null) => void;
  openUI: (id: number, name: string) => void;
  clearUI: () => void;
};

// Crea el estado global del juego
export const createUI = (set: any, get: any): UIState => ({
  idOpenUI: null,
  nameUI: null,
  message: null,

  // Modificamos el mensaje
  setMessage: (value) =>
    set((state: any) => ({
      ui: {
        ...state.ui,
        message: value,
      },
    })),

  // Abre o cierra la interfaz según el edificio clickeado
  openUI: (id, name) => {
    const { modeState } = get();

    // Si hay un estado activo distinto de idle, lo cancelamos
    if (modeState.mode !== "idle") {
      modeState.cancelState();
    }

    // Si es otro edificio → abrir su interfaz
    set((state: any) => ({
      ui: {
        ...state.ui,
        idOpenUI: id,
        nameUI: name,
      },
    }));
  },

  // Cierra cualquier interfaz abierta
  clearUI: () =>
    set((state: any) => ({
      ui: {
        ...state.ui,
        idOpenUI: null,
        nameUI: null,
        message: null,
      },
    })),
});
