import { ShoppingBag, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export const Header = () => {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="container flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-ember grid place-items-center shadow-glow">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="leading-none">
            <p className="font-display text-xl font-bold">Don Pepe</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Pollo a la leña</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#menu" className="hover:text-primary transition-smooth">Menú</a>
          <a href="#info" className="hover:text-primary transition-smooth">Horarios</a>
          <a href="#contacto" className="hover:text-primary transition-smooth">Contacto</a>
        </nav>
        <Button variant="ember" size="sm" onClick={() => setOpen(true)} className="relative">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Mi pedido</span>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[11px] font-bold grid place-items-center">
              {count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};