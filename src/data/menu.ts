export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
};

export const categories = [
  { id: 'pollos', name: 'Pollos a la Leña', icon: '🔥' },
  { id: 'milanesas', name: 'Milanesas', icon: '🥩' },
  { id: 'fajitas', name: 'Fajitas', icon: '🌯' },
  { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
  { id: 'lomitos', name: 'Lomitos & Sándwiches', icon: '🥖' },
  { id: 'guarniciones', name: 'Guarniciones', icon: '🍟' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
];

export const menu: MenuItem[] = [
  // Pollos
  { id: 'p1', name: 'Pollo Entero a la Leña', description: 'Nuestro clásico, dorado a la leña con su jugo natural.', price: 12500, category: 'pollos', badge: 'Más pedido' },
  { id: 'p2', name: 'Medio Pollo a la Leña', description: 'Ideal para 1 o 2 personas, con piel crocante.', price: 6800, category: 'pollos' },
  { id: 'p3', name: 'Pollo + Papas Fritas', description: 'Pollo entero con porción generosa de papas.', price: 15500, category: 'pollos', badge: 'Combo' },
  { id: 'p4', name: 'Pollo + Ensalada Mixta', description: 'Pollo entero con ensalada de lechuga, tomate y cebolla.', price: 14800, category: 'pollos' },

  // Milanesas
  { id: 'm1', name: 'Milanesa a la Napolitana', description: 'Con jamón, queso y salsa. Acompañada con papas.', price: 11500, category: 'milanesas', badge: 'Destacado' },
  { id: 'm2', name: 'Milanesas de Pepe', description: 'La especial de la casa: con huevo, panceta y queso.', price: 12800, category: 'milanesas' },
  { id: 'm3', name: 'Milanesa con Roquefort', description: 'Bañada en salsa de queso roquefort cremosa.', price: 12200, category: 'milanesas' },
  { id: 'm4', name: 'Milanesa Simple', description: 'Crocante, dorada y con limón.', price: 8900, category: 'milanesas' },

  // Fajitas
  { id: 'f1', name: 'Fajitas Mixtas', description: 'Carne y pollo con vegetales salteados. Para 3-4 personas.', price: 16500, category: 'fajitas', badge: 'Las mejores de Córdoba' },
  { id: 'f2', name: 'Fajitas de Pollo', description: 'Tiras de pollo con morrones y cebolla.', price: 14500, category: 'fajitas' },
  { id: 'f3', name: 'Fajitas de Carne', description: 'Tiras de carne sellada con vegetales.', price: 15000, category: 'fajitas' },

  // Pizzas
  { id: 'pz1', name: 'Pizza Mitad Napo Mitad Fugazzeta', description: 'Lo mejor de dos mundos en una sola pizza.', price: 10500, category: 'pizzas', badge: 'Combo' },
  { id: 'pz2', name: 'Pizza Muzzarella', description: 'Clásica, con muzza generosa y orégano.', price: 8500, category: 'pizzas' },
  { id: 'pz3', name: 'Pizza Especial', description: 'Jamón, morrón, huevo y aceitunas.', price: 11200, category: 'pizzas' },

  // Lomitos
  { id: 'l1', name: 'Lomito Completo', description: 'Bife de lomo, jamón, queso, huevo, lechuga y tomate.', price: 9800, category: 'lomitos', badge: 'Abundante' },
  { id: 'l2', name: 'Lomito Simple', description: 'Bife de lomo con lechuga y tomate.', price: 8200, category: 'lomitos' },
  { id: 'l3', name: 'Salame y Pan', description: 'Tabla de salame con pan casero.', price: 4500, category: 'lomitos' },

  // Guarniciones
  { id: 'g1', name: 'Papas Fritas', description: 'Porción grande, recién hechas.', price: 4200, category: 'guarniciones' },
  { id: 'g2', name: 'Papas con Cheddar y Panceta', description: 'Cargadas con queso cheddar fundido.', price: 5800, category: 'guarniciones' },
  { id: 'g3', name: 'Empanadas (docena)', description: 'Carne, pollo o jamón y queso.', price: 7800, category: 'guarniciones' },
  { id: 'g4', name: 'Ensalada Mixta', description: 'Lechuga, tomate y cebolla.', price: 3200, category: 'guarniciones' },

  // Bebidas
  { id: 'b1', name: 'Coca-Cola 1.5L', description: 'Bien fría.', price: 2800, category: 'bebidas' },
  { id: 'b2', name: 'Agua Mineral 1.5L', description: 'Con o sin gas.', price: 1800, category: 'bebidas' },
  { id: 'b3', name: 'Cerveza Quilmes 1L', description: 'Helada al toque.', price: 2500, category: 'bebidas' },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);