"# Estructura de Componentes en Next.js con Colocation

## 📂 Principios de Colocation
La **colocation** consiste en agrupar archivos relacionados en una misma carpeta para mejorar la organización y la legibilidad del código.

### Ejemplo: Componente `UserProfile`
```
src/
  app/
    user/
      profile/
        page.tsx          # Página principal
        components/       # Componentes locales
          ProfileHeader.tsx
          UserStats.tsx
          Tabs/
            Tabs.tsx       # Componente reutilizable
            Tab.tsx
        lib/               # Lógica reutilizable
          hooks.ts        # Custom hooks
          utils.ts        # Funciones auxiliares
        styles/            # Estilos locales
          styles.module.css
```

### Ejemplo: Componente `ProductCard`
```
src/
  app/
    products/
      components/
        ProductCard/
          ProductCard.tsx    # Componente principal
          ProductCard.skeleton.tsx  # Skeletons para carga
          ProductCard.styles.css
          ProductCard.test.tsx      # Test local
```

---

## 🔧 Componentes en Next.js

### 1. Componentes Server
Los componentes **Server** pueden llamar a APIs, bases de datos o autenticación directamente.

```tsx
// app/products/page.tsx
import { createClient } from '@/lib/supabase/server';

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) throw new Error('Error al cargar productos');

  return (
    <div>
      <h1>Productos</h1>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 2. Componentes Client
Los componentes **Client** deben usar `use client` y no pueden llamar directamente a APIs o autenticación.

```tsx
// components/ProductCard/ProductCard.tsx
'use client';

import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? '❤️' : '♡'}
      </button>
    </div>
  );
}
```

---

## 📁 Estructura de un Componente Complejo: `Dashboard`
```
src/
  app/
    dashboard/
      page.tsx           # Página principal
      components/
        Sidebar.tsx      # Barra lateral
        Header.tsx       # Header del dashboard
        StatsCard.tsx    # Tarjetas de estadísticas
        RecentActivity.tsx
      lib/
        hooks.ts         # Custom hooks para el dashboard
        utils.ts         # Funciones de utilidad
      styles/
        styles.module.css
```

### Ejemplo de `Dashboard` con Colocation
```tsx
// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import RecentActivity from './components/RecentActivity';

export default async function Dashboard() {
  const supabase = createClient();
  const { data: stats, error } = await supabase
    .from('dashboard_stats')
    .select('*');

  if (error) throw new Error('Error al cargar estadísticas');

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="dashboard-cards">
          <StatsCard stats={stats} />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
```

---

## 📌 Recomendaciones

1. **Mantén la colocation lógica**: Agrupa archivos relacionados en la misma carpeta.
2. **Evita carpetas profundas**: Más de 3 niveles puede complicar la navegación.
3. **Usa `components/` para componentes locales**: Esto ayuda a mantener el código modular.
4. **Documenta tu estructura**: Usa comentarios o un `README.md` en carpetas complejas para explicar su propósito.
5. **Separa la lógica de los componentes**: Usa `lib/` para hooks, utilidades y funciones reutilizables.
6. **Sigue el patrón de Next.js**: Usa `app/` para rutas y `components/` para componentes globales.
"