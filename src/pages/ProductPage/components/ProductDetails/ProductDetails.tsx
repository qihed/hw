import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import Button from 'components/Button';
import Text from 'components/Text';
import CartQuantityControl from 'components/CartQuantityControl';
import styles from 'pages/ProductPage/components/ProductDetails/ProductDetails.module.scss';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from 'api/products';
import ProductDetailsSkeleton from 'pages/ProductPage/components/ProductDetails/ProductDetailsSkeleton';
import { useProductPageStore } from 'pages/ProductPage/ProductPageContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const store = useProductPageStore();
  const product = store.product;
  const error = store.errorProductId;
  const loading =
    store.loadingProductId ||
    (id != null && (store.product == null || String(store.product.documentId) !== String(id)));

  if (error) {
    return (
      <div className={styles.container}>
        <p>Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <p>Товар не найден</p>
      </div>
    );
  }

  const imageUrl = getProductImageUrl(product) ?? DEFAULT_PRODUCT_IMAGE;

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
            <CartQuantityControl
              productId={product.documentId}
              addLabel="Add to Cart"
              buttonClassName={styles.btnCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductDetails);
