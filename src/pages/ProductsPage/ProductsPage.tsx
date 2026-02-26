import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useProducts } from 'api/useProducts';

import styles from 'pages/ProductsPage/ProductsPage.module.scss';
import 'styles/index.scss';
import Description from 'pages/ProductsPage/components/Description';
import TechInfo from 'pages/ProductsPage/components/TechInfo';
import ProductCardList from 'components/ProductCardList';
import Nav from 'pages/ProductsPage/components/Nav';
import Header from 'components/Header';

const PAGE_SIZE = 24;

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNumber = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const { products, total, loading, error } = useProducts(pageNumber, PAGE_SIZE);
  const pageCount = total > 0 ? Math.ceil(total / PAGE_SIZE) : 1;
  const currentPage = Math.min(pageNumber, pageCount);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageParam]);

  return (
    <>
      <Header />
      <main>
        <Description />
        <TechInfo total={total} loading={loading} />
        <div className={styles.mainContent}>
          <ProductCardList products={products} loading={loading} error={error} />
        </div>
        <Nav currentPage={currentPage} pageCount={pageCount} />
      </main>
    </>
  );
};

export default ProductsPage;
