-- Ejecutar en Supabase > SQL Editor

create table if not exists productos (
  id bigint generated always as identity primary key,
  nombre text not null,
  descripcion text,
  categoria text not null default 'Otros',
  precio numeric(10,2) not null check (precio >= 0),
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now()
);

-- RLS activado sin políticas: solo el servidor (service role) puede leer/escribir
alter table productos enable row level security;

-- Permisos para el servidor (por si la opción "exponer nuevas tablas" está desactivada)
grant all on table productos to service_role;
grant usage, select on all sequences in schema public to service_role;

insert into productos (nombre, descripcion, categoria, precio, stock) values
  ('Palomita', 'Cuete clásico de trueno, paquete de 10', 'Truenos', 25, 200),
  ('Brujita', 'Silba y gira por el suelo, paquete de 12', 'Piso', 30, 150),
  ('Chifladores', 'Silbato con chispas, paquete de 6', 'Piso', 45, 80),
  ('Bengalas', 'Luces de chispa doradas, paquete de 10', 'Luces', 20, 300),
  ('Cohete de vara', 'Sube y truena en el aire, pieza', 'Aéreos', 15, 120),
  ('Volcán', 'Fuente de chispas de colores, 30 segundos', 'Fuentes', 60, 50),
  ('Pastel de 25 tiros', 'Batería de tiros de colores', 'Pasteles', 350, 20);
