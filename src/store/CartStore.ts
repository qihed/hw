import { makeAutoObservable, reaction } from 'mobx';
import type { CartItem } from 'api/types';

const CART_KEY = 'cart';

function readFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function writeToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.items = readFromStorage();
    reaction(
      () => this.items,
      (items) => writeToStorage(items),
      { fireImmediately: false }
    );
  }

  addItem(productId: string, quantity = 1) {
    const existing = this.items.find((item) => item.productId === productId);
    const currentQty = existing?.quantity ?? 0;
    this.setQuantity(productId, currentQty + quantity);
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.productId !== productId);
  }

  setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const index = this.items.findIndex((item) => item.productId === productId);
    if (index >= 0) {
      this.items = this.items.map((item, i) =>
        i === index ? { ...item, productId, quantity } : item
      );
    } else {
      this.items = [...this.items, { productId, quantity }];
    }
  }

  clear() {
    this.items = [];
  }

  get totalCount(): number {
    return this.items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  }

  getQuantity(productId: string): number {
    const item = this.items.find((i) => i.productId === productId);
    return item?.quantity ?? 0;
  }
}

export const cartStore = new CartStore();
