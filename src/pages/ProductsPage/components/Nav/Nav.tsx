import { useMemo } from 'react';
import { Link } from 'react-router';
import styles from 'pages/ProductsPage/components/Nav/Nav.module.scss';
import Text from 'components/Text';
import rightArrow from 'assets/right-arrow.png';

function getPageUrl(page: number): string {
  return `/products?page=${page}`;
}

export type NavProps = {
  currentPage: number;
  pageCount: number;
};

const Nav = ({ currentPage, pageCount }: NavProps) => {
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(pageCount, currentPage + 1);

  const pages = useMemo(() => {
    const result: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
      result.push(i);
    }
    return result;
  }, [pageCount]);

  return (
    <div className={styles.container}>
      <Link
        to={getPageUrl(prevPage)}
        className={currentPage <= 1 ? styles.disabled : undefined}
        aria-disabled={currentPage <= 1}
      >
        <img className={`${styles.start} ${styles.block}`} src={rightArrow} alt="страница" />
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          to={getPageUrl(page)}
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
        to={getPageUrl(nextPage)}
        className={currentPage >= pageCount ? styles.disabled : undefined}
        aria-disabled={currentPage >= pageCount}
      >
        <img src={rightArrow} alt="страница" />
      </Link>
    </div>
  );
};

export default Nav;
