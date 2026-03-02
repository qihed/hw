import { useState, useEffect } from 'react';
import { getProduct, getProductCategories, getProducts } from 'api/products';
import type { Product, ProductCategory } from 'api/types';

export function useProducts(page = 1, pageSize = 25, search?: string, categoryIds?: number[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => setLoading(true));
    getProducts({
      page,
      pageSize,
      populate: ['images', 'productCategory'],
      search,
      categoryIds: categoryIds?.length ? categoryIds : undefined,
    })
      .then((res) => {
        if (cancelled) return;
        setError(null);
        setProducts(res.data);
        setTotal(res.meta.pagination.total);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, search, categoryIds]);

  return { products, total, loading, error };
}

export function useProduct(id: number | string | null | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id === null || id === undefined || id === '') {
      queueMicrotask(() => {
        setError(null);
        setLoading(false);
        setProduct(null);
      });
      return;
    }
    let cancelled = false;
    queueMicrotask(() => setLoading(true));
    getProduct(id, { populate: ['images', 'productCategory'] })
      .then((res) => {
        if (!cancelled) {
          setError(null);
          setProduct(res.data);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}

export function useProductCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    getProductCategories()
      .then((res) => {
        if (!cancelled) {
          setError(null);
          const list = Array.isArray(res.data) ? res.data : [];
          setCategories(list);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading, error };
}
