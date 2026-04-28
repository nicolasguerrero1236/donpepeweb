import { MapPin, Phone, Clock, Star } from 'lucide-react';

const schedule = [
  ['Martes', '11–15h · 19–24h'],
  ['Miércoles', '11–15h · 19–24h'],
  ['Jueves', '11–15h · 19–24h'],
  ['Viernes', '11–15h · 19–24h'],
  ['Sábado', '11–15h · 19–24h'],
  ['Domingo', '11–15h'],
  ['Lunes', 'Cerrado'],
];

export const InfoFooter = () => (
  <>
    <section id="info" className="py-24" style={{ background: 'hsl(var(--charcoal))' }}>
      <div className="container grid md:grid-cols-3 gap-10" style={{ color: 'hsl(var(--cream))' }}>
        <div>
          <Clock className="w-8 h-8 mb-4" style={{ color: 'hsl(var(--mustard))' }} />
          <h3 className="font-display text-2xl font-bold mb-4">Horarios</h3>
          <ul className="space-y-1.5 text-sm" style={{ color: 'hsl(var(--cream) / 0.8)' }}>
            {schedule.map(([d, h]) => (
              <li key={d} className="flex justify-between border-b border-white/10 pb-1.5">
                <span>{d}</span><span className="font-medium">{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <MapPin className="w-8 h-8 mb-4" style={{ color: 'hsl(var(--mustard))' }} />
          <h3 className="font-display text-2xl font-bold mb-4">Dónde estamos</h3>
          <p style={{ color: 'hsl(var(--cream) / 0.8)' }}>Cacheuta 3750<br />X5000 Córdoba, Argentina</p>
          <a href="https://maps.google.com/?q=Cacheuta+3750+Córdoba" target="_blank" rel="noopener"
             className="inline-block mt-4 text-sm font-semibold underline" style={{ color: 'hsl(var(--mustard))' }}>
            Ver en Google Maps →
          </a>
        </div>
        <div id="contacto">
          <Phone className="w-8 h-8 mb-4" style={{ color: 'hsl(var(--mustard))' }} />
          <h3 className="font-display text-2xl font-bold mb-4">Contacto</h3>
          <a href="tel:+543514623212" className="block text-lg font-semibold hover:underline">0351 462-3212</a>
          <p className="mt-3 text-sm flex items-center gap-1.5" style={{ color: 'hsl(var(--cream) / 0.8)' }}>
            <Star className="w-4 h-4 fill-current" style={{ color: 'hsl(var(--mustard))' }} />
            4.5 · 698 opiniones en Google
          </p>
        </div>
      </div>
    </section>
    <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
      © {new Date().getFullYear()} Don Pepe · Pollo a la leña · Hecho con 🔥 en Córdoba
    </footer>
  </>
);