
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  previewUrl?: string | null;
  formats?: unknown;
  hash: string;
  ext: string;
  mime: string;
  size: number;
}

export interface ProductCategory {
  id: number;
  documentId: string;
  name?: string;
  slug?: string;
  [key: string]: unknown;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock: boolean;
  images?: StrapiImage[] | { data: StrapiImage[] };
  productCategory?: ProductCategory | { data: ProductCategory };
  [key: string]: unknown;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ProductResponse {
  data: Product;
}
