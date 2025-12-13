import { useGameStore } from "../game/gameStore";

export default function Header() {
  const money = useGameStore((s) => s.money);

  return (
    <header className="flex-col h-screen w-60 flex gap-2 absolute left-0 bg-red-800 px-2">
      <h1>Utopia</h1>
      <h6>{money}</h6>
    </header>
  );
}
