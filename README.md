# Cuetes El Chispazo

Página de venta de cuetes con CRUD de productos.

- **Next.js 15** (frontend y backend)
- **Supabase** (base de datos PostgreSQL)
- Rutas: `/` catálogo público · `/admin` CRUD (crear, ver, editar, eliminar)

## 1. Supabase (base de datos)

1. Crear cuenta en https://supabase.com y un proyecto nuevo.
2. Ir a **SQL Editor**, pegar el contenido de `supabase.sql` y ejecutarlo.
3. En **Project Settings > API** copiar:
   - Project URL → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (¡no compartirla!)

## 2. Correr en local

```bash
cp .env.example .env.local   # y pegar los datos de Supabase
npm install
npm run dev                  # http://localhost:3000
```

## 3. Despliegue gratis: Vercel

1. Subir el proyecto a GitHub.
2. En https://vercel.com → **Add New > Project** → importar el repo.
3. En **Environment Variables** agregar `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
4. **Deploy**. Vercel da una URL tipo `https://cuetes.vercel.app`.

## 4. Despliegue de pago: DigitalOcean (Droplet)

1. Crear Droplet: Ubuntu 24.04, plan Basic más barato. Acceso por contraseña o SSH key.
2. Conectarse: `ssh root@IP_DEL_DROPLET`
3. Instalar Node, git, PM2 y Nginx:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
   apt install -y nodejs git nginx
   npm install -g pm2
   ```
4. Si el plan tiene poca RAM (512 MB), crear swap para que compile:
   ```bash
   fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
   ```
5. Clonar y compilar:
   ```bash
   git clone https://github.com/TU_USUARIO/cuetes.git && cd cuetes
   nano .env.local            # pegar SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
   npm install && npm run build
   pm2 start npm --name cuetes -- start
   pm2 startup && pm2 save
   ```
6. Configurar Nginx (`nano /etc/nginx/sites-available/default`), dentro de `location / { ... }`:
   ```nginx
   proxy_pass http://localhost:3000;
   proxy_set_header Host $host;
   ```
   Luego `systemctl restart nginx`.
7. Abrir `http://IP_DEL_DROPLET` en el navegador.

> Al terminar la práctica, **destruir el Droplet** para que deje de cobrar.
