import type { ProductCategory, StrapiImage } from 'api/types';

export type ProductApi = {
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
};

export type ProductModel = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock: boolean;
  images?: StrapiImage[];
  productCategory?: ProductCategory;
  [key: string]: unknown;
};

export const normalizeProduct = (from: ProductApi): ProductModel => {
  const images: StrapiImage[] | undefined = Array.isArray(from.images)
    ? from.images
    : from.images &&
        typeof from.images === 'object' &&
        'data' in from.images &&
        Array.isArray((from.images as { data: StrapiImage[] }).data)
      ? (from.images as { data: StrapiImage[] }).data
      : undefined;

  const productCategory: ProductCategory | undefined =
    from.productCategory == null
      ? undefined
      : typeof from.productCategory === 'object' && 'data' in from.productCategory
        ? (from.productCategory as { data: ProductCategory }).data
        : (from.productCategory as ProductCategory);

  return {
    ...from,
    images,
    productCategory,
  };
};
