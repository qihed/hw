import Button from 'components/Button';
import Text from 'components/Text';
import styles from 'pages/ProductPage/components/ProductDetails/ProductDetails.module.scss';
import type { Product } from 'api/types';
import { getProductImageUrl } from 'api/products';

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x600';

export type ProductDetails = {
  product: Product | null;
  loading?: boolean;
  error?: Error | null;
};

const ProductDetails = ({ product, loading = false, error = null }: ProductDetails) => {
  if (error) {
    return (
      <div className={styles.container}>
        <p>Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Загрузка…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <p>Товар не найден</p>
      </div>
    );
  }

  const imageUrl = getProductImageUrl(product) ?? PLACEHOLDER_IMAGE;

  return (
    <div className={styles.container}>
      <div className={styles.imgItem}>
        <img src={imageUrl} alt={product.title} />
      </div>

      <div className={styles.info}>
        <div className={styles.text}>
          <Text view="title">{product.title}</Text>
          <Text view="p-20" color="secondary" className={styles.text}>
            {product.description}
          </Text>
        </div>

        <div className={styles.action}>
          <Text view="title">{product.price}₽</Text>
          <div className={styles.btnFrame}>
            <Button>Buy Now</Button>
            <Button className={styles.btnCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
