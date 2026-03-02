import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import styles from './ProductsPage.module.scss';
import Description from 'pages/ProductsPage/components/Description';
import TechInfo from 'pages/ProductsPage/components/TechInfo';
import ProductCardList from 'components/ProductCardList';
import SkeletonCard from 'components/Skeleton';
import Text from 'components/Text';
import Nav from 'pages/ProductsPage/components/Nav';
import Header from 'components/Header';
import { catalogStore } from 'store/CatalogStore';
import { observer } from 'mobx-react-lite';

function parseCategoryIds(param: string | null): number[] {
  if (!param?.trim()) return [];
  return param
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
}

const ProductsPage = () => {
  // берём query-параметры из url и передаем в CatalogStore.loadProducts
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchQuery = searchParams.get('search') ?? '';
  const categoryParam = searchParams.get('category');
  const pageNumber = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const categoryIds = useMemo(() => parseCategoryIds(categoryParam), [categoryParam]);

  //вызываем при монтировании, чтобы получить список категорий
  useEffect(() => {
    catalogStore.loadCategories();
  }, []);

  useEffect(() => {
    catalogStore.loadProducts({
      page: pageNumber,
      search: searchQuery,
      categoryIds,
    });
  }, [pageNumber, searchQuery, categoryIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageParam]);
  //все костыли нижк по написанию длинных функций в пропсах уберу к некст дз
  //выбрал оставить url источников правды. интересно твоё мнение насколько это правильно
  //и если нет, то как получать и обрабатывать query-параметры в сторе
  return (
    <>
      <Header />
      <main>
        <Description />
        <TechInfo
          total={catalogStore.total}
          loading={catalogStore.loadingProducts}
          searchValue={searchQuery}
          onSearchSubmit={(value) => {
            const next = new URLSearchParams(searchParams);
            if (value.trim()) {
              next.set('search', value.trim());
            } else {
              next.delete('search');
            }
            next.set('page', '1');
            setSearchParams(next);
          }}
          categoryOptions={catalogStore.categoryOptions}
          selectedCategoryIds={categoryIds}
          onCategoryChange={(ids) => {
            const next = new URLSearchParams(searchParams);
            if (ids.length) {
              next.set('category', ids.join(','));
            } else {
              next.delete('category');
            }
            next.set('page', '1');
            setSearchParams(next);
          }}
          onClearSearch={() => {
            const next = new URLSearchParams(searchParams);
            next.delete('search');
            next.set('page', '1');
            setSearchParams(next);
          }}
          onClearCategory={() => {
            const next = new URLSearchParams(searchParams);
            next.delete('category');
            next.set('page', '1');
            setSearchParams(next);
          }}
        />
        <div className={styles.mainContent}>
          {catalogStore.loadingProducts ? (
            <div className={styles.skeletonList}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : catalogStore.products.length === 0 &&
            (searchQuery.trim() || categoryIds.length > 0) ? (
            <div className={styles.emptySearch}>
              <Text view="title">По выбранным фильтрам товаров не найдено</Text>
            </div>
          ) : (
            <ProductCardList
              products={catalogStore.products}
              loading={catalogStore.loadingProducts}
              error={catalogStore.errorProducts}
            />
          )}
        </div>
        <Nav
          currentPage={catalogStore.currentPage}
          pageCount={catalogStore.pageCount}
          searchQuery={searchQuery}
          categoryParam={categoryParam}
        />
      </main>
    </>
  );
};

export default observer(ProductsPage);
