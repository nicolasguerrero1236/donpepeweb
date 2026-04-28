import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { CartDrawer } from '@/components/CartDrawer';
import { InfoFooter } from '@/components/InfoFooter';

const Index = () => (
  <CartProvider>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <InfoFooter />
      </main>
      <CartDrawer />
    </div>
  </CartProvider>
);

export default Index;
