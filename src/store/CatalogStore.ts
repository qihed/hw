import { makeAutoObservable, runInAction } from 'mobx';
import type { Product, ProductCategory } from 'api/types';
import { getProduct, getProductCategories, getProducts } from 'api/products';

type LoadProductsQuery = {
  page: number;
  search: string;
  categoryIds: number[];
};

export class CatalogStore {
  // observable — то, что храним
  products: Product[] = [];
  total = 0;
  loadingProducts = false;
  errorProducts: Error | null = null;

  categories: ProductCategory[] = [];
  loadingCategory = false;
  errorCategory: Error | null = null;

  product: Product | null = null;
  loadingProductId = false;
  errorProductId: Error | null = null;

  requestedPage = 1;
  readonly pageSize = 24;

  private requestId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async loadProducts(query: LoadProductsQuery) {
    const myRequest = ++this.requestId;

    this.requestedPage = query.page;
    this.loadingProducts = true;
    this.errorProducts = null;

    try {
      const res = await getProducts({
        page: query.page,
        pageSize: this.pageSize,
        search: query.search,
        categoryIds: query.categoryIds,
        populate: ['images', 'productCategory'],
      });

      if (myRequest !== this.requestId) return;

      runInAction(() => {
        this.products = res.data;
        this.total = res.meta.pagination.total;
      });
    } catch (e) {
      if (myRequest !== this.requestId) return;

      runInAction(() => {
        this.errorProducts = e instanceof Error ? e : new Error(String(e));
      });
    } finally {
      if (myRequest === this.requestId) {
        runInAction(() => {
          this.loadingProducts = false;
        });
      }
    }
  }

  async loadCategories() {
    this.loadingCategory = true;
    this.errorCategory = null;
    try {
      const res = await getProductCategories();

      runInAction(() => {
        this.categories = Array.isArray(res.data) ? res.data : [];
      });
    } catch (e) {
      runInAction(() => {
        this.errorCategory = e instanceof Error ? e : new Error(String(e));
      });
    } finally {
      runInAction(() => {
        this.loadingCategory = false;
      });
    }
  }

  async loadProduct(id: number | string | null | undefined) {
    if (id === null || id === undefined || id === '') {
      this.product = null;
      this.errorProductId = null;
      this.loadingProductId = false;
      return;
    }
    this.loadingProductId = true;
    this.errorProductId = null;

    try {
      const res = await getProduct(id, {
        populate: ['images', 'productCategory'],
      });

      runInAction(() => {
        this.product = res.data;
      });
    } catch (e) {
      runInAction(() => {
        this.errorProductId = e instanceof Error ? e : new Error(String(e));
      });
    } finally {
      runInAction(() => {
        this.loadingProductId = false;
      });
    }
  }

  get pageCount(): number {
    return this.total > 0 ? Math.ceil(this.total / this.pageSize) : 1;
  }

  get currentPage(): number {
    return Math.min(this.requestedPage, this.pageCount);
  }

  get categoryOptions() {
    return this.categories.map((cat) => ({
      key: String(cat.id),
      value: cat.name ?? cat.slug ?? `Категория ${cat.id}`,
    }));
  }
}

// один экземпляр на приложение
export const catalogStore = new CatalogStore();
