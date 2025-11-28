import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  totalQuantity: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id
          );

          if (existingItem) {
          
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

     
          return {
            items: [...state.items, item],
          };

        }),

 removeFromCart: (id) =>
  set((state) => {
    const newItems = state.items.filter((i) => i.id !== id);
    toast.success("Item removed from cart");
    return { items: newItems };
  }),


      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.length,

      totalQuantity: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage", 
    }
  )
);
