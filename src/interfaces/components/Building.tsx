import { BUILDINGS } from "../../data/buildings";
import BuildingCard from "./BuildingCard";

export default function Building() {
  return (
    <main className="grid grid-cols-3 auto-rows-[154px] gap-2 w-full h-120 overflow-y-auto">
      {Object.values(BUILDINGS)
        .slice(1)
        .map((b, i) => (
          <BuildingCard key={i} build={b} />
        ))}
    </main>
  );
}
