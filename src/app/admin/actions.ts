"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

function leerFormulario(form: FormData) {
  return {
    nombre: String(form.get("nombre") ?? "").trim(),
    descripcion: String(form.get("descripcion") ?? "").trim() || null,
    categoria: String(form.get("categoria") ?? "Otros"),
    precio: Number(form.get("precio") ?? 0),
    stock: Number(form.get("stock") ?? 0),
  };
}

export async function crearProducto(form: FormData) {
  const { error } = await supabase().from("productos").insert(leerFormulario(form));
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function actualizarProducto(id: number, form: FormData) {
  const { error } = await supabase().from("productos").update(leerFormulario(form)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function eliminarProducto(id: number) {
  const { error } = await supabase().from("productos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}
