import { useGameStore } from "../game/gameStore";

export default function MessageBar() {
  const { message } = useGameStore((s) => s.ui);

  if (!message) return null;

  return (
    <section className="border-3 border-emerald-500 rounded-xl py-2 px-4 bg-emerald-300 absolute top-18">
      <h6>{message}</h6>
    </section>
  );
}
