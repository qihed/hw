export type ProductsPageParams = {
  page?: number;
  search?: string;
  category?: string | null;
};

export function getProductsPageUrl(params: ProductsPageParams = {}): string {
  const { page = 1, search = '', category = null } = params;
  const urlParams = new URLSearchParams();
  urlParams.set('page', String(page));
  if (search.trim()) urlParams.set('search', search.trim());
  if (category?.trim()) urlParams.set('category', category.trim());
  const query = urlParams.toString();
  return query ? `/products?${query}` : '/products';
}
