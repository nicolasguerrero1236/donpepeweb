import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { MenuItem } from '@/data/menu';

export type CartLine = MenuItem & { qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  const add = (item: MenuItem) => {
    setLines(prev => {
      const found = prev.find(l => l.id === item.id);
      if (found) return prev.map(l => l.id === item.id ? { ...l, qty: l.qty + 1 } : l);
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setLines(prev => prev.filter(l => l.id !== id));
  const setQty = (id: string, qty: number) =>
    setLines(prev => qty <= 0 ? prev.filter(l => l.id !== id) : prev.map(l => l.id === id ? { ...l, qty } : l));
  const clear = () => setLines([]);

  const { count, total } = useMemo(() => ({
    count: lines.reduce((s, l) => s + l.qty, 0),
    total: lines.reduce((s, l) => s + l.qty * l.price, 0),
  }), [lines]);

  return (
    <Ctx.Provider value={{ lines, add, remove, setQty, clear, count, total, isOpen, setOpen }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
};