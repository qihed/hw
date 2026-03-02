import { has, isObservable } from 'mobx';
import qs from 'qs';
import api from 'api/api';
import type {
  Product,
  ProductCategory,
  ProductResponse,
  ProductCategoryResponse,
  ProductsResponse,
  StrapiImage,
} from 'api/types';

export type GetProductsParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  populate?: string[];
  search?: string;
  categoryIds?: number[];
};

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const {
    page = 1,
    pageSize = 25,
    sort,
    populate = ['images', 'productCategory'],
    search,
    categoryIds,
  } = params;

  const filters: Record<string, unknown> = {};
  if (search?.trim()) {
    filters.title = { $containsi: search.trim() };
  }
  if (categoryIds?.length) {
    filters.productCategory =
      categoryIds.length === 1 ? { id: { $eq: categoryIds[0] } } : { id: { $in: categoryIds } };
  }

  const query = qs.stringify(
    {
      populate,
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'pagination[withCount]': true,
      ...(sort && { sort }),
      ...(Object.keys(filters).length > 0 && { filters }),
    },
    { encode: false }
  );

  const { data } = await api.get<ProductsResponse>(`/products?${query}`);
  return data;
}

export async function getProductCategories(): Promise<ProductCategoryResponse> {
  const res = await api.get<{ data?: ProductCategory[] | { data?: ProductCategory[] } }>(
    '/product-categories'
  );
  const raw = res.data;
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as { data?: ProductCategory[] }).data)
      ? (raw as { data: ProductCategory[] }).data
      : [];
  return { data: list };
}

export type GetProductParams = {
  populate?: string[];
};

export async function getProduct(
  id: number | string,
  params: GetProductParams = {}
): Promise<ProductResponse> {
  const { populate = ['images', 'productCategory'] } = params;
  const query = qs.stringify({ populate }, { encode: false });
  const url = query ? `/products/${id}?${query}` : `/products/${id}`;
  const { data } = await api.get<ProductResponse>(url);
  return data;
}

/** Проверка наличия ключа: для observable — has(), для обычных объектов — in */
function hasKey(obj: object, key: string): boolean {
  return isObservable(obj) ? has(obj, key) : key in obj;
}

export function getProductImageUrl(product: Product): string | undefined {
  const images = product.images;
  if (Array.isArray(images) && images[0]) return images[0].url;
  if (images && hasKey(images, 'data')) {
    const data = (images as { data: StrapiImage[] }).data;
    if (Array.isArray(data) && data[0]) return data[0].url;
  }
  return undefined;
}

export function getProductCategoryName(product: Product): string {
  const cat = product.productCategory;
  if (!cat) return '';
  const data = hasKey(cat, 'data') ? cat.data : cat;
  if (!data || typeof data !== 'object' || !hasKey(data, 'name')) return '';
  const name = (data as { name?: unknown }).name;
  return typeof name === 'string' ? name : '';
}
