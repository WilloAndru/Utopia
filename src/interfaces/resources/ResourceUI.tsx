import { TERRAINOBJECTS } from "../../data/terrainObject";

type ResourceProps = {
  name: string;
};

export default function ResourceUI({ name }: ResourceProps) {
  // Obtenemos los datos del objeto
  const object = Object.values(TERRAINOBJECTS).find(
    (item) => item.name === name
  );

  // Manejo de error
  if (!object) return null;

  return (
    <main
      className={`${object.color} py-2 px-3 rounded-xl border-3 border-emerald-700 w-fit flex flex-col gap-1 items-center`}
    >
      <h6>{object.name}</h6>
      {/* Lista de materiales que otorga */}
      <ul className="flex gap-2">
        {Object.entries(object.effects).map(([objName, quantity]) => (
          <li className="flex  gap-2" key={objName}>
            <img className="w-5" src={`/${objName}.png`} alt={objName} />
            <h6>+ {quantity}</h6>
          </li>
        ))}
      </ul>
      <button className="btn-2 flex items-center gap-1">
        <span>Demoler por</span>
        <img className="w-4" src="/moneda.png" alt="Moneda" />
        <span>{object.cost}</span>
      </button>
    </main>
  );
}
