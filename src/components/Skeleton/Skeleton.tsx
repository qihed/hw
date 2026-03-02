import type { ComponentProps } from 'react';
import ContentLoader from 'react-content-loader';
import styles from 'components/Skeleton/Skeleton.module.scss';

type SkeletonProps = ComponentProps<typeof ContentLoader>;

const Skeleton = (props: SkeletonProps) => (
  <div className={styles.skeletonCard}>
    <ContentLoader
      speed={4}
      width="100%"
      height="100%"
      viewBox="0 0 360 618"
      preserveAspectRatio="xMidYMid meet"
      backgroundColor="#fafafa"
      foregroundColor="#518581"
      className={styles.skeletonSvg}
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="360" height="360" />
      <rect x="12" y="408" rx="0" ry="0" width="336" height="18" />
      <rect x="12" y="434" rx="0" ry="0" width="336" height="24" />
      <rect x="12" y="466" rx="0" ry="0" width="336" height="20" />
      <rect x="12" y="533" rx="0" ry="0" width="60" height="20" />
      <rect x="193" y="518" rx="0" ry="0" width="155" height="52" />
    </ContentLoader>
  </div>
);

export default Skeleton;
