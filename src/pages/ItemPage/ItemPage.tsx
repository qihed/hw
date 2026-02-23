import { useParams, Link } from 'react-router';
import styles from './ItemPage.module.scss';
import Text from '../../components/Text';
import Item from './components/Item';
import Field from '../ProductsPage/components/Field';
import Header from '../ProductsPage/components/Header/Header';
import { useProduct } from '../../api/useProducts';
import { useProducts } from '../../api/useProducts';
import rightArrow from '../../assets/right-arrow.png';

const ItemPage = () => {
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
        <Item product={product} loading={loading} error={error} />
        <Text className={styles.text}>Total products</Text>
        <div className={styles.field}>
          <Field products={products} loading={productsLoading} error={productsError} />
        </div>
      </div>
    </>
  );
};

export default ItemPage;
