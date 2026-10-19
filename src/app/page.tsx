import { supabase, type Producto } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Catalogo() {
  const { data, error } = await supabase().from("productos").select("*").order("categoria");
  const productos = (data ?? []) as Producto[];

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Catálogo</h1>
      <p className="mb-8 text-zinc-400">Cuetes para tus fiestas. Precios por paquete o pieza.</p>

      {error && <p className="text-red-400">Error al cargar productos: {error.message}</p>}
      {!error && productos.length === 0 && <p className="text-zinc-400">No hay productos todavía.</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <article key={p.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <span className="text-xs uppercase tracking-wide text-orange-400">{p.categoria}</span>
            <h2 className="mt-1 text-lg font-semibold">{p.nombre}</h2>
            <p className="mt-1 text-sm text-zinc-400">{p.descripcion}</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-2xl font-bold">${Number(p.precio).toFixed(2)}</span>
              <span className={`text-sm ${p.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                {p.stock > 0 ? `${p.stock} disponibles` : "Agotado"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
