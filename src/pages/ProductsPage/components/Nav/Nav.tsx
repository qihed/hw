import { useMemo } from 'react';
import { Link } from 'react-router';
import styles from 'pages/ProductsPage/components/Nav/Nav.module.scss';
import Text from 'components/Text';
import rightArrow from 'assets/right-arrow.png';

function getPageUrl(
  page: number,
  search: string = '',
  category: string | null = null
): string {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (search.trim()) params.set('search', search.trim());
  if (category?.trim()) params.set('category', category.trim());
  const query = params.toString();
  return query ? `/products?${query}` : '/products';
}

export type NavProps = {
  currentPage: number;
  pageCount: number;
  /** Текущая строка поиска (для сохранения в URL при смене страницы) */
  searchQuery?: string;
  /** Текущий параметр category в URL (например "1,4") */
  categoryParam?: string | null;
};

const Nav = ({
  currentPage,
  pageCount,
  searchQuery = '',
  categoryParam = null,
}: NavProps) => {
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(pageCount, currentPage + 1);

  const pages = useMemo(() => {
    const result: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
      result.push(i);
    }
    return result;
  }, [pageCount]);

  const toPageUrl = (page: number) => getPageUrl(page, searchQuery, categoryParam);

  return (
    <div className={styles.container}>
      <Link
        to={toPageUrl(prevPage)}
        className={currentPage <= 1 ? styles.disabled : undefined}
        aria-disabled={currentPage <= 1}
      >
        <img className={`${styles.start} ${styles.block}`} src={rightArrow} alt="страница" />
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          to={toPageUrl(page)}
          className={page === currentPage ? styles.linkActive : styles.link}
        >
          <Text
            className={page === currentPage ? `${styles.text} ${styles.textAccent}` : styles.text}
          >
            {page}
          </Text>
        </Link>
      ))}
      <Link
        to={toPageUrl(nextPage)}
        className={currentPage >= pageCount ? styles.disabled : undefined}
        aria-disabled={currentPage >= pageCount}
      >
        <img src={rightArrow} alt="страница" />
      </Link>
    </div>
  );
};

export default Nav;
