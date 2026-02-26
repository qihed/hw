import { Link } from 'react-router';
import styles from 'components/ProductCardList/ProductCardList.module.scss';
import Card from 'components/Card';
import Button from 'components/Button';
import type { Product } from 'api/types';
import { getProductImageUrl, getProductCategoryName } from 'api/products';

const PLACEHOLDER_IMAGE =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg';

export type ProductCardListProps = {
  products: Product[];
  loading?: boolean;
  error?: Error | null;
};

const ProductCardList = ({ products, loading = false, error = null }: ProductCardListProps) => {
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
      {products.map((product) => (
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
            actionSlot={<Button>В корзину</Button>}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductCardList;
