import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Text from 'components/Text';
import styles from 'pages/ProductPage/components/ProductDetails/ProductDetails.module.scss';
import type { Product } from 'api/types';
import { getProductImageUrl } from 'api/products';
import { cartStore } from 'store/CartStore';

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
    return null;
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
            {cartStore.getQuantity(product.documentId) > 0 ? (
              <div className={styles.cartControls}>
                <Button
                  type="button"
                  className={styles.btnCart}
                  onClick={() =>
                    cartStore.setQuantity(
                      product.documentId,
                      cartStore.getQuantity(product.documentId) - 1
                    )
                  }
                  aria-label="Убрать одну"
                >
                  −
                </Button>
                <Text view="p-20" className={styles.cartQty}>
                  {cartStore.getQuantity(product.documentId)}
                </Text>
                <Button
                  type="button"
                  className={styles.btnCart}
                  onClick={() => cartStore.addItem(product.documentId, 1)}
                  aria-label="Добавить одну"
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                className={styles.btnCart}
                onClick={() => cartStore.addItem(product.documentId, 1)}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductDetails);
