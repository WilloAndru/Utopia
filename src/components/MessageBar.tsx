import { useEffect, useState } from "react";
import { useGameStore } from "../game/gameStore";

export default function MessageBar() {
  const { message, setMessage } = useGameStore((s) => s.ui);
  const [visible, setVisible] = useState(true); // Controla la transicion suave

  // Mostramos el mensaje 2.5s, con una transicion de 0.3s
  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setMessage(null), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <section
      className={`border-3 border-emerald-500 rounded-xl py-2 px-4 bg-emerald-300 absolute top-18 transition-opacity duration-300 
        ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <h6>{message}</h6>
    </section>
  );
}
