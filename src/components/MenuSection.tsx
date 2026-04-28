import { useState } from 'react';
import { menu, categories, formatPrice } from '@/data/menu';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

export const MenuSection = () => {
  const [active, setActive] = useState(categories[0].id);
  const { add } = useCart();
  const items = menu.filter(i => i.category === active);

  return (
    <section id="menu" className="py-24 bg-gradient-warm">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Nuestra carta</p>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-4">Hecho con fuego, servido con cariño</h2>
          <p className="text-muted-foreground text-lg">Recetas tradicionales de Don Pepe, listas para tu mesa.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 -mx-4 px-4 snap-x">
          {categories.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`shrink-0 snap-start px-5 py-2.5 rounded-full text-sm font-semibold transition-smooth border-2 ${
                active === c.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-warm'
                  : 'bg-card text-foreground border-border hover:border-primary/40'
              }`}>
              <span className="mr-1.5">{c.icon}</span>{c.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <article key={item.id}
              className="group relative bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-warm transition-smooth animate-float-up"
              style={{ animationDelay: `${idx * 50}ms` }}>
              {item.badge && (
                <span className="absolute -top-2 left-5 px-2.5 py-1 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {item.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 min-h-[40px]">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
                <Button variant="ember" size="sm" onClick={() => add(item)}>
                  <Plus className="w-4 h-4" /> Agregar
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};