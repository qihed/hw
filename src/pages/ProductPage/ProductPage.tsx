import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { observer } from 'mobx-react-lite';
import { ProductPageStore } from 'pages/ProductPage/ProductPageStore';
import { ProductPageStoreProvider } from 'pages/ProductPage/ProductPageContext';

import styles from 'pages/ProductPage/ProductPage.module.scss';
import rightArrow from 'assets/right-arrow.png';
import Text from 'components/Text';
import ProductCardList from 'components/ProductCardList';
import SkeletonCard from 'components/Skeleton';
import Header from 'components/Header';
import ProductDetails from 'pages/ProductPage/components/ProductDetails';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const pageStore = useMemo(() => new ProductPageStore(), []);

  useEffect(() => {
    pageStore.loadProduct(id);
    pageStore.loadSimilar(3);
    return () => pageStore.destroy();
  }, [id, pageStore]);

  return (
    <>
      <Header />
      <ProductPageStoreProvider store={pageStore}>
        <div className={styles.container}>
          <Link to="/products" className={styles.back}>
            <img className={`${styles.start} ${styles.block}`} src={rightArrow} alt="arrow nav" />
            <Text view="p-20">Назад</Text>
          </Link>
          <ProductDetails />
          <Text className={styles.text}>Total products</Text>
          <div className={styles.field}>
            {pageStore.loadingSimilar ? (
              <div className={styles.skeletonSingle}>
                <SkeletonCard />
              </div>
            ) : (
              <ProductCardList
                products={pageStore.similarProducts}
                loading={pageStore.loadingSimilar}
                error={pageStore.errorSimilar}
              />
            )}
          </div>
        </div>
      </ProductPageStoreProvider>
    </>
  );
};

export default observer(ProductPage);
