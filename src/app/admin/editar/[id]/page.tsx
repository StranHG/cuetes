import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, type Producto } from "@/lib/supabase";
import { actualizarProducto } from "../../actions";
import FormularioProducto from "../../FormularioProducto";

export const dynamic = "force-dynamic";

export default async function Editar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase().from("productos").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const producto = data as Producto;

  return (
    <>
      <Link href="/admin" className="text-sm text-zinc-400 hover:text-orange-400">← Volver</Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">Editar: {producto.nombre}</h1>
      <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <FormularioProducto
          accion={actualizarProducto.bind(null, producto.id)}
          producto={producto}
          textoBoton="Guardar cambios"
        />
      </section>
    </>
  );
}
