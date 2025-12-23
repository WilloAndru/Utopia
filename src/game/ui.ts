export type UIState = {
  idOpenUI: number | null;
  nameUI: string | null;
  message: string | null;
  setMessage: (value: string) => void;
  openUI: (id: number, name: string) => void;
  clearUI: () => void;
};

// Crea el estado global del juego
export const createUI = (set: any, get: any): UIState => ({
  idOpenUI: null,
  nameUI: null,
  message: null,

  setMessage: (value: string) =>
    set({
      message: value,
    }),

  // Abre o cierra la interfaz según el edificio clickeado
  openUI: (id: number, name: string) => {
    const { idOpenUI, modeState } = get();

    // Si ya hay un estado activo, lo cerramos
    if (modeState.mode !== "idle") {
      modeState.cancelState();
    }

    // Si se hace click en el mismo edificio → toggle (cerrar)
    if (idOpenUI === id) {
      set({
        idOpenUI: null,
        nameUI: null,
      });
      return;
    }

    // Si es otro edificio → abrir su interfaz
    set({
      idOpenUI: id,
      nameUI: name,
    });
  },

  // Cierra cualquier interfaz abierta
  clearUI: () => {
    set({
      idOpenUI: null,
      nameUI: null,
    });
  },
});
