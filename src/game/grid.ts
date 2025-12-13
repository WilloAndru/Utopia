export type Cell = {
  building: null;
};

// Crea una grilla del 50x50 y los atributos iniciales
export function createGrid(): Cell[][] {
  const size = 50;

  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      building: null,
    }))
  );
}
