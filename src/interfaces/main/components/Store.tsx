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
    <main className="grid grid-cols-2 auto-rows-[149px] h-full gap-2 w-full overflow-y-auto">
      {materials.map((m, i) => (
        <div
          key={i}
          className="rounded-xl px-4 py-2 flex flex-col gap-1 items-center justify-between border-3 border-emerald-700"
        >
          <img className="w-10" src={`/${m.type}.png`} alt={m.type} />
          {m.amount}
        </div>
      ))}
    </main>
  );
}
