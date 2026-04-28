import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/menu';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '5493514623212'; // Don Pepe — 0351 462-3212
const DELIVERY_FEE = 1500;

export const CartDrawer = () => {
  const { lines, isOpen, setOpen, setQty, remove, total, clear, count } = useCart();
  const [mode, setMode] = useState<'retiro' | 'delivery'>('retiro');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const finalTotal = total + (mode === 'delivery' ? DELIVERY_FEE : 0);

  const sendOrder = () => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Ingresá tu nombre y teléfono');
      return;
    }
    if (mode === 'delivery' && !address.trim()) {
      toast.error('Ingresá la dirección de entrega');
      return;
    }
    if (lines.length === 0) {
      toast.error('Tu pedido está vacío');
      return;
    }

    const itemsTxt = lines
      .map(l => `• ${l.qty}x ${l.name} — ${formatPrice(l.qty * l.price)}`)
      .join('\n');

    const msg =
`*🍗 Nuevo pedido — Don Pepe*

👤 *Cliente:* ${name}
📞 *Tel:* ${phone}
📦 *Modalidad:* ${mode === 'retiro' ? 'Retiro en local' : 'Delivery'}${mode === 'delivery' ? `\n📍 *Dirección:* ${address}` : ''}

*Pedido:*
${itemsTxt}

Subtotal: ${formatPrice(total)}${mode === 'delivery' ? `\nEnvío: ${formatPrice(DELIVERY_FEE)}` : ''}
*Total: ${formatPrice(finalTotal)}*
${notes ? `\n📝 *Notas:* ${notes}` : ''}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    toast.success('Abriendo WhatsApp para enviar tu pedido');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Tu pedido {count > 0 && <span className="text-sm font-sans text-muted-foreground">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {lines.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Tu carrito está vacío</p>
              <p className="text-sm">Agregá algo rico del menú 🔥</p>
            </div>
          ) : (
            <>
              {lines.map(l => (
                <div key={l.id} className="flex gap-3 pb-4 border-b border-border/60">
                  <div className="flex-1">
                    <p className="font-semibold leading-tight">{l.name}</p>
                    <p className="text-sm text-primary font-bold mt-1">{formatPrice(l.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setQty(l.id, l.qty - 1)}
                        className="w-7 h-7 rounded-full border border-border grid place-items-center hover:bg-muted transition-smooth">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-semibold">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)}
                        className="w-7 h-7 rounded-full border border-border grid place-items-center hover:bg-muted transition-smooth">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => remove(l.id)}
                        className="ml-auto text-destructive hover:opacity-80 transition-smooth">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-bold whitespace-nowrap">{formatPrice(l.price * l.qty)}</p>
                </div>
              ))}

              <div className="space-y-4 pt-2">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Modalidad</Label>
                  <RadioGroup value={mode} onValueChange={v => setMode(v as 'retiro' | 'delivery')} className="grid grid-cols-2 gap-2">
                    <label className={`border-2 rounded-xl p-3 cursor-pointer transition-smooth ${mode === 'retiro' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value="retiro" className="sr-only" />
                      <p className="font-semibold text-sm">Retiro</p>
                      <p className="text-xs text-muted-foreground">En el local</p>
                    </label>
                    <label className={`border-2 rounded-xl p-3 cursor-pointer transition-smooth ${mode === 'delivery' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value="delivery" className="sr-only" />
                      <p className="font-semibold text-sm">Delivery</p>
                      <p className="text-xs text-muted-foreground">+ {formatPrice(DELIVERY_FEE)}</p>
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} maxLength={60} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} maxLength={20} placeholder="351..." />
                  </div>
                  {mode === 'delivery' && (
                    <div>
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" value={address} onChange={e => setAddress(e.target.value)} maxLength={120} placeholder="Calle, altura, depto" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="notes">Notas (opcional)</Label>
                    <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} maxLength={300} placeholder="Sin sal, extra picante…" rows={2} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t bg-muted/30 px-6 py-4 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
              {mode === 'delivery' && (
                <div className="flex justify-between text-muted-foreground"><span>Envío</span><span>{formatPrice(DELIVERY_FEE)}</span></div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-display text-xl font-bold">
                <span>Total</span><span className="text-primary">{formatPrice(finalTotal)}</span>
              </div>
            </div>
            <Button variant="ember" size="lg" className="w-full" onClick={sendOrder}>
              <MessageCircle className="w-5 h-5" /> Enviar pedido por WhatsApp
            </Button>
            <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-destructive transition-smooth">
              Vaciar carrito
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};