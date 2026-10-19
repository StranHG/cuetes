import { CATEGORIAS, type Producto } from "@/lib/supabase";

type Props = {
  accion: (form: FormData) => Promise<void>;
  producto?: Producto;
  textoBoton: string;
};

export default function FormularioProducto({ accion, producto, textoBoton }: Props) {
  return (
    <form action={accion} className="grid gap-3 sm:grid-cols-2">
      <label className="text-sm">
        Nombre
        <input name="nombre" required defaultValue={producto?.nombre} className="input mt-1" />
      </label>
      <label className="text-sm">
        Categoría
        <select name="categoria" defaultValue={producto?.categoria ?? "Truenos"} className="input mt-1">
          {CATEGORIAS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        Precio
        <input name="precio" type="number" step="0.01" min="0" required defaultValue={producto?.precio} className="input mt-1" />
      </label>
      <label className="text-sm">
        Stock
        <input name="stock" type="number" min="0" required defaultValue={producto?.stock ?? 0} className="input mt-1" />
      </label>
      <label className="text-sm sm:col-span-2">
        Descripción
        <textarea name="descripcion" rows={2} defaultValue={producto?.descripcion ?? ""} className="input mt-1" />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn">{textoBoton}</button>
      </div>
    </form>
  );
}
