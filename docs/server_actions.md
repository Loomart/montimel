# Server Actions con Zod

## 🛡 Validación con Zod
Usar **Zod** para validar todos los inputs de Server Actions.

### Ejemplo: Crear un Post
```ts
// app/actions.ts
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// Esquema de validación
const postSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().optional(),
  authorId: z.string().uuid(),
});

export async function createPost(formData: FormData) {
  // Parsear y validar datos
  const validatedFields = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    authorId: formData.get("authorId"),
  });

  if (!validatedFields.success) {
    return { error: "Datos inválidos", fields: validatedFields.error.format() };
  }

  // Guardar en Supabase
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert([validatedFields.data])
    .select();

  if (error) throw new Error(error.message);

  return { success: true, post: data[0] };
}
```

### Ejemplo: Actualizar un Producto
```ts
const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  price: z.coerce.number().positive(),
});

export async function updateProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    price: formData.get("price"),
  });

  if (!validatedFields.success) {
    return { error: "Datos inválidos" };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .update(validatedFields.data)
    .eq("id", validatedFields.data.id)
    .select();

  if (error) throw new Error(error.message);

  return { success: true, product: data[0] };
}
```

## 🛠 Manejo de Errores
- Siempre validar los datos antes de interactuar con la base de datos.
- Usar `safeParse` de Zod para manejar errores de forma estructurada.
- Retornar mensajes de error claros al cliente.

## 📌 Notas
- Server Actions **siempre deben validar sus inputs**.
- Usar `FormData` para recibir datos desde formularios.
- Las acciones pueden ser llamadas desde componentes con `action={createPost}`.
```