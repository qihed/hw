import { Link } from 'react-router';
import styles from './Field.module.scss';
import Card from '../../../../components/Card';
import Button from '../../../../components/Button';
import type { Product } from '../../../../api/types';
import {
  getProductImageUrl,
  getProductCategoryName,
} from '../../../../api/products';

const PLACEHOLDER_IMAGE =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg';

export type FieldProps = {
  products: Product[];
  loading?: boolean;
  error?: Error | null;
};

const Field = ({ products, loading = false, error = null }: FieldProps) => {
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
          key={product.documentId ?? product.id}
          to={`/products/${product.documentId ?? product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card
            image={getProductImageUrl(product) ?? PLACEHOLDER_IMAGE}
            captionSlot={
              getProductCategoryName(product) ? (
                getProductCategoryName(product)
              ) : null
            }
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

export default Field;
