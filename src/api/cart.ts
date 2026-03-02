import type { CartItem } from 'api/types';

const CART_KEY = 'cart';

//планирую добавлять ещё отдельный экран с корзиной и вывод возле ярлыка корзины количества товаров

export function addCartItem({ productId, quantity = 1 }: CartItem): boolean {
  try {
    const items = getCart();
    const existing = items.find((item) => item.productId === productId);
    const currentQty = existing?.quantity ?? 0;
    editCartItem({ productId, quantity: currentQty + quantity });
    return true;
  } catch {
    return false;
  }
}

export function getCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function editCartItem({ productId, quantity }: CartItem) {
  try {
    const data = localStorage.getItem(CART_KEY);
    const items: CartItem[] = data ? JSON.parse(data) : [];
    const index = items.findIndex((item) => item.productId === productId);
    const qty = quantity ?? 1;

    if (index >= 0) {
      if (quantity === 0) {
        items.splice(index, 1);
      } else {
        items[index] = { ...items[index], productId, quantity: qty };
      }
    } else if (qty > 0) {
      items.push({ productId, quantity: qty });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}
