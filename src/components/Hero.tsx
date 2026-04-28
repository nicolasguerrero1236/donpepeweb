import heroImg from '@/assets/hero-pollo.jpg';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin } from 'lucide-react';

export const Hero = () => (
  <section id="inicio" className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Pollo a la leña dorado de Don Pepe" width={1920} height={1080}
           className="w-full h-full object-cover animate-flicker" />
      <div className="absolute inset-0 bg-gradient-fire" />
    </div>
    <div className="relative container min-h-[88vh] flex flex-col justify-center py-20">
      <div className="max-w-2xl animate-float-up">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/95 text-accent-foreground text-xs font-semibold tracking-wide mb-6">
          <Star className="w-3.5 h-3.5 fill-current" /> 4.5 · 698 opiniones
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-cream leading-[0.95] mb-6"
            style={{ color: 'hsl(var(--cream))' }}>
          El sabor de la <span className="italic" style={{ color: 'hsl(var(--mustard))' }}>brasa</span> en tu mesa.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl" style={{ color: 'hsl(var(--cream) / 0.85)' }}>
          Pollo a la leña, milanesas y fajitas auténticas de Córdoba. Pedí online y retiralo o te lo llevamos.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <Button variant="ember" size="lg" asChild>
            <a href="#menu">Pedir ahora</a>
          </Button>
          <Button variant="outline" size="lg" asChild
                  className="bg-background/10 backdrop-blur border-cream/30 hover:bg-background/20"
                  style={{ color: 'hsl(var(--cream))', borderColor: 'hsl(var(--cream) / 0.3)' }}>
            <a href="#info">Ver horarios</a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'hsl(var(--cream) / 0.9)' }}>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Cacheuta 3750, Córdoba</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Hoy: 11–15h · 19–24h</span>
        </div>
      </div>
    </div>
  </section>
);