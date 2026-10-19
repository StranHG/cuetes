import Link from "next/link";
import { supabase, type Producto } from "@/lib/supabase";
import { crearProducto, eliminarProducto } from "./actions";
import FormularioProducto from "./FormularioProducto";
import BotonEliminar from "./BotonEliminar";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const { data, error } = await supabase().from("productos").select("*").order("id");
  const productos = (data ?? []) as Producto[];

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Administrar productos</h1>

      <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-semibold">Agregar producto</h2>
        <FormularioProducto accion={crearProducto} textoBoton="Agregar" />
      </section>

      {error && <p className="text-red-400">Error: {error.message}</p>}

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-t border-zinc-800">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.nombre}</td>
                <td className="px-4 py-3">{p.categoria}</td>
                <td className="px-4 py-3">${Number(p.precio).toFixed(2)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="flex gap-4 px-4 py-3">
                  <Link href={`/admin/editar/${p.id}`} className="text-orange-400 hover:underline">Editar</Link>
                  <BotonEliminar accion={eliminarProducto.bind(null, p.id)} nombre={p.nombre} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
