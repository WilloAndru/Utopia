import { BUILDINGS } from "../../data/buildings";

export default function Building() {
  return (
    <main className="grid grid-cols-3 gap-2">
      {Object.values(BUILDINGS)
        .slice(1)
        .map((b, i) => (
          <section
            key={i}
            className="bg-emerald-300 rounded-xl px-3 py-2 flex flex-col gap-2 items-center justify-between"
          >
            <h6>{b.name}</h6>
            <div
              style={{
                width: b.size * 26,
                height: b.size * 26,
              }}
              className={`${b.color} border border-black`}
            />
            <button className="btn-2">Ver mas</button>
          </section>
        ))}
    </main>
  );
}
