import { useParams, Link } from 'react-router';
import { useProduct } from 'api/useProducts';
import { useProducts } from 'api/useProducts';

import styles from 'pages/ProductPage/ProductPage.module.scss';
import rightArrow from 'assets/right-arrow.png';
import Text from 'components/Text';
import ProductCardList from 'components/ProductCardList';
import Header from 'components/Header';
import ProductDetails from 'pages/ProductPage/components/ProductDetails';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const { products, loading: productsLoading, error: productsError } = useProducts(1, 3);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Link to="/products" className={styles.back}>
          <img className={`${styles.start} ${styles.block}`} src={rightArrow} alt="arrow nav" />
          <Text view="p-20">Назад</Text>
        </Link>
        <ProductDetails product={product} loading={loading} error={error} />
        <Text className={styles.text}>Total products</Text>
        <div className={styles.field}>
          <ProductCardList products={products} loading={productsLoading} error={productsError} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
