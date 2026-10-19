import "server-only";
import { createClient } from "@supabase/supabase-js";

export type Producto = {
  id: number;
  nombre: string;
  descripcion: string | null;
  categoria: string;
  precio: number;
  stock: number;
  created_at: string;
};

export const CATEGORIAS = ["Truenos", "Piso", "Luces", "Aéreos", "Fuentes", "Pasteles", "Otros"];

// Cliente solo de servidor: la service role key nunca llega al navegador
export function supabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
