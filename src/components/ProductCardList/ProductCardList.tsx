import { Link } from 'react-router';
import { observer } from 'mobx-react-lite';
import styles from 'components/ProductCardList/ProductCardList.module.scss';
import Card from 'components/Card';
import Button from 'components/Button';
import type { Product } from 'api/types';
import { getProductImageUrl, getProductCategoryName } from 'api/products';
import { cartStore } from 'store/CartStore';

const PLACEHOLDER_IMAGE =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg';

export type ProductCardListProps = {
  products: Product[];
  loading?: boolean;
  error?: Error | null;
};

const ProductCardList = ({ products, loading = false, error = null }: ProductCardListProps) => {
  const stopLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    stopLink(e);
    cartStore.addItem(productId, 1);
  };

  const handleIncrease = (e: React.MouseEvent, productId: string) => {
    stopLink(e);
    cartStore.addItem(productId, 1);
  };

  const handleDecrease = (e: React.MouseEvent, productId: string) => {
    stopLink(e);
    const qty = cartStore.getQuantity(productId);
    if (qty > 0) cartStore.setQuantity(productId, qty - 1);
  };

  if (error) {
    return (
      <div className={styles.container}>
        <p>Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  if (loading && products.length === 0) {
    return (
      <div className={styles.container}>
        <p>Загрузка…</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {products.map((product) => {
        const qty = cartStore.getQuantity(product.documentId);
        return (
          <Link
            key={product.documentId}
            to={`/products/${product.documentId}`}
            className={styles.cardLink}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card
              image={getProductImageUrl(product) || PLACEHOLDER_IMAGE}
              captionSlot={getProductCategoryName(product) || null}
              title={product.title}
              subtitle={product.description || '—'}
              contentSlot={<>{product.price}₽</>}
              actionSlot={
                qty > 0 ? (
                  <div className={styles.cartControls} onClick={stopLink}>
                    <Button
                      type="button"
                      onClick={(e) => handleDecrease(e, product.documentId)}
                      aria-label="Убрать одну"
                    >
                      −
                    </Button>
                    <span className={styles.cartQty}>{qty}</span>
                    <Button
                      type="button"
                      onClick={(e) => handleIncrease(e, product.documentId)}
                      aria-label="Добавить одну"
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <Button onClick={(e) => handleAddToCart(e, product.documentId)}>В корзину</Button>
                )
              }
            />
          </Link>
        );
      })}
    </div>
  );
};

export default observer(ProductCardList);
