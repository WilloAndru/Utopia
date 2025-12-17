import { BUILDINGS } from "../../../data/buildings";
import BuildingCard from "./BuildingCard";

// Interfaz de construccion, para consturir todas las estructuras
export default function Building() {
  return (
    <main className="grid grid-cols-3 auto-rows-[149px] h-full gap-2 w-full overflow-y-auto">
      {Object.values(BUILDINGS)
        .slice(1)
        .map((b, i) => (
          <BuildingCard key={i} build={b} />
        ))}
    </main>
  );
}
