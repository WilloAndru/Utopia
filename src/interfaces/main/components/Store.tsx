import { resourceKeys } from "../../../data/buildings";
import { useGameStore } from "../../../game/gameStore";

export default function Store() {
  const resources = useGameStore((s) => s.resources);

  // Lista de materiales con cantidad
  const materials = resourceKeys.map((key) => ({
    type: key,
    amount: resources[key],
  }));

  return (
    <main className="grid grid-cols-4 gap-2">
      {materials.map((m, i) => (
        <div
          key={i}
          className="rounded-xl px-4 py-2 flex items-center justify-around border-3 border-emerald-700 bg-emerald-300"
        >
          <img className="w-8" src={`/${m.type}.png`} alt={m.type} />
          <h6>{m.amount}</h6>
        </div>
      ))}
    </main>
  );
}
