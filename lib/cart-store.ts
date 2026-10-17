'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { findProduct } from './products';

export type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  lastAddedId: string | null;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      lastAddedId: null,
      add: (productId) =>
        set((state) => {
          const product = findProduct(productId);
          if (!product) return state;
          const existing = state.lines.find((l) => l.id === productId);
          const lines = existing
            ? state.lines.map((l) =>
                l.id === productId ? { ...l, quantity: Math.min(l.quantity + 1, 20) } : l,
              )
            : [
                ...state.lines,
                { id: product.id, name: product.name, price: product.price, quantity: 1 },
              ];
          return { ...state, lines, isOpen: true, lastAddedId: productId };
        }),
      remove: (productId) =>
        set((state) => ({ ...state, lines: state.lines.filter((l) => l.id !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          ...state,
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.id !== productId)
              : state.lines.map((l) =>
                  l.id === productId ? { ...l, quantity: Math.min(quantity, 20) } : l,
                ),
        })),
      clear: () => set((state) => ({ ...state, lines: [] })),
      open: () => set((state) => ({ ...state, isOpen: true })),
      close: () => set((state) => ({ ...state, isOpen: false })),
      toggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
    }),
    {
      name: 'yami-tarot-cart',
      partialize: (state) => ({ lines: state.lines }) as unknown as CartState,
    },
  ),
);

export const cartCount = (lines: CartLine[]) => lines.reduce((acc, l) => acc + l.quantity, 0);
export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((acc, l) => acc + l.quantity * l.price, 0);
