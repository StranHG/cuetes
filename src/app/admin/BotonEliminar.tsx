"use client";

export default function BotonEliminar({ accion, nombre }: { accion: () => Promise<void>; nombre: string }) {
  return (
    <form
      action={accion}
      onSubmit={(e) => {
        if (!confirm(`¿Eliminar "${nombre}"?`)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-red-400 hover:underline">Eliminar</button>
    </form>
  );
}
