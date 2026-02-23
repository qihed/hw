import qs from "qs";
import api from "./api";
import type { Product, ProductResponse, ProductsResponse } from "./types";

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  populate?: string[];
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  const {
    page = 1,
    pageSize = 25,
    sort,
    populate = ["images", "productCategory"],
  } = params;

  const query = qs.stringify(
    {
      populate,
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      "pagination[withCount]": true,
      ...(sort && { sort }),
    },
    { encode: false },
  );

  const { data } = await api.get<ProductsResponse>(`/products?${query}`);
  return data;
}

export interface GetProductParams {
  populate?: string[];
}

export async function getProduct(
  id: number | string,
  params: GetProductParams = {},
): Promise<ProductResponse> {
  const { populate = ["images", "productCategory"] } = params;
  const query = qs.stringify({ populate }, { encode: false });
  const url = query ? `/products/${id}?${query}` : `/products/${id}`;
  const { data } = await api.get<ProductResponse>(url);
  return data;
}

export function getProductImageUrl(product: Product): string | undefined {
  const images = product.images;
  if (Array.isArray(images) && images[0]) return images[0].url;
  if (
    images &&
    "data" in images &&
    Array.isArray(images.data) &&
    images.data[0]
  ) {
    return images.data[0].url;
  }
  return undefined;
}

export function getProductCategoryName(product: Product): string {
  const cat = product.productCategory;
  if (!cat) return "";
  const data = "data" in cat ? cat.data : cat;
  if (!data || typeof data !== "object" || !("name" in data)) return "";
  const name = (data as { name?: unknown }).name;
  return typeof name === "string" ? name : "";
}
