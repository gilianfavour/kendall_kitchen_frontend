import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  menu_item_id:          number;
  name:                  string;
  image_url:             string | null;
  unit_price:            number;
  quantity:              number;
  special_instructions?: string;
}

interface CartState {
  items:    CartItem[];
  isOpen:   boolean;

  // Computed helpers
  totalItems:  () => number;
  totalAmount: () => number;

  // Actions
  addItem:     (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem:  (menuItemId: number) => void;
  updateQty:   (menuItemId: number, quantity: number) => void;
  updateNote:  (menuItemId: number, note: string) => void;
  clearCart:   () => void;
  openCart:    () => void;
  closeCart:   () => void;
  toggleCart:  () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalAmount: () =>
        get().items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0),

      addItem: (incoming) => {
        const { quantity = 1, ...rest } = incoming;
        set((state) => {
          const existing = state.items.find(i => i.menu_item_id === rest.menu_item_id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.menu_item_id === rest.menu_item_id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items:  [...state.items, { ...rest, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (menuItemId) =>
        set(state => ({
          items: state.items.filter(i => i.menu_item_id !== menuItemId),
        })),

      updateQty: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.menu_item_id === menuItemId ? { ...i, quantity } : i
          ),
        }));
      },

      updateNote: (menuItemId, note) =>
        set(state => ({
          items: state.items.map(i =>
            i.menu_item_id === menuItemId
              ? { ...i, special_instructions: note }
              : i
          ),
        })),

      clearCart:   () => set({ items: [] }),
      openCart:    () => set({ isOpen: true }),
      closeCart:   () => set({ isOpen: false }),
      toggleCart:  () => set(s => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'kk-cart',
      partialize: (state) => ({ items: state.items }), // don't persist isOpen
    }
  )
);
