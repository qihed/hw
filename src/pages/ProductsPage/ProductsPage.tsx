import { useEffect } from 'react';
import '../../styles/index.css';
import { useSearchParams } from 'react-router';
import { useProducts } from '../../api/useProducts';
import Description from './components/Description/Description';
import TechInfo from './components/TechInfo/TechInfo';
import Field from './components/Field/Field';
import Nav from './components/Nav/Nav';
import Header from './components/Header/Header';
import styles from './ProductsPage.module.scss';

const PAGE_SIZE = 24;

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNumber = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const { products, total, loading, error } = useProducts(
    pageNumber,
    PAGE_SIZE,
  );
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
          <Field products={products} loading={loading} error={error} />
        </div>
        <Nav currentPage={currentPage} pageCount={pageCount} />
      </main>
    </>
  );
};

export default ProductsPage;
