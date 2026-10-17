'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart-store';

/** Al volver de un pago aprobado, el carrito ya no tiene sentido. */
export function ClearCart() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
