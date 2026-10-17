'use client';

import { usePathname } from 'next/navigation';
import { CartDrawer } from './cart-drawer';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { WhatsappFab } from './whatsapp-fab';

/**
 * El panel y las pantallas de pago no necesitan la navegación de la landing
 * (sus anclas no existen ahí y el footer con CTA distrae).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const isAdmin = pathname.startsWith('/admin');
  const isCheckoutResult = pathname.startsWith('/pago');
  const showHeader = !isAdmin && !isCheckoutResult;
  const showFooter = !isAdmin && !isCheckoutResult;

  return (
    <>
      {showHeader ? <SiteHeader /> : null}
      {showHeader ? <CartDrawer /> : null}
      <main className="relative z-10">{children}</main>
      {showFooter ? <SiteFooter /> : null}
      {showHeader ? <WhatsappFab /> : null}
    </>
  );
}
