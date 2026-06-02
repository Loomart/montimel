# Database Setup (Supabase)

## 🔐 Row Level Security (RLS)
RLS **debe estar habilitada en todas las tablas**. Ejemplo para la tabla `users`:

```sql
-- Habilitar RLS en la tabla
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política para permitir que un usuario solo acceda a sus propios datos
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Política para permitir insertar/actualizar solo si el uid coincide
CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Política para permitir eliminar solo si el uid coincide
CREATE POLICY "Users can delete their own data"
ON users FOR DELETE
USING (auth.uid() = id);
```

## 📊 Tablas Críticas
| Tabla       | RLS Activada | Políticas de Ejemplo                                                                 |
|-------------|--------------|------------------------------------------------------------------------------------|
| `users`     | ✅           | Solo el usuario puede acceder/editar sus propios datos.                          |
| `products`  | ✅           | Políticas por roles (ej: `is_admin` puede editar todos los productos).             |
| `orders`    | ✅           | Solo el usuario que creó el pedido puede verlo (o un admin).                      |

## 🔄 Migraciones
Usar la herramienta oficial de Supabase para migraciones:

```bash
# Instalar la CLI de Supabase
npm install -g supabase

# Crear una migración (ej: añadir columna `created_at` a `users`)
supabase db diff --project-id <PROJECT_ID> > schema.sql
supabase db apply --project-id <PROJECT_ID> schema.sql
```

## 🔒 Backups
- Hacer backups **diarios** de la base de datos:
  ```bash
  supabase db dump --project-id <PROJECT_ID> > backup.sql
  ```
- Guardar el backup en un **servicio externo** (AWS S3, Backblaze).

## 📌 Notas
- **Nunca** deshabilitar RLS en producción.
- Usar la **clave `service_role`** solo en funciones administrativas (nunca en el cliente).
```