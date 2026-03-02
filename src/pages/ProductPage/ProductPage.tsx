import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useProducts } from 'api/useProducts';
import { catalogStore } from 'store/CatalogStore';

import styles from 'pages/ProductPage/ProductPage.module.scss';
import rightArrow from 'assets/right-arrow.png';
import Text from 'components/Text';
import ProductCardList from 'components/ProductCardList';
import SkeletonCard from 'components/Skeleton';
import Header from 'components/Header';
import ProductDetails from 'pages/ProductPage/components/ProductDetails';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  //подскажи как мне уйти от useProducts(1, 3). не хочу повторно вызывать loadProducts и передавать pageSize=3.
  //мб есть вариант лучше и легче?
  const { products, loading: productsLoading, error: productsError } = useProducts(1, 3);

  useEffect(() => {
    catalogStore.loadProduct(id);
  }, [id]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Link to="/products" className={styles.back}>
          <img className={`${styles.start} ${styles.block}`} src={rightArrow} alt="arrow nav" />
          <Text view="p-20">Назад</Text>
        </Link>
        <ProductDetails
          product={catalogStore.product}
          loading={catalogStore.loadingProductId}
          error={catalogStore.errorProductId}
        />
        <Text className={styles.text}>Total products</Text>
        <div className={styles.field}>
          {productsLoading ? (
            <div className={styles.skeletonSingle}>
              <SkeletonCard />
            </div>
          ) : (
            <ProductCardList products={products} loading={productsLoading} error={productsError} />
          )}
        </div>
      </div>
    </>
  );
};

export default observer(ProductPage);
