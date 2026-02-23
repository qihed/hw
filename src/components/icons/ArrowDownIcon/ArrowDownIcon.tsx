import * as React from 'react';
import type { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({
  className,
  color,
  width = 24,
  height = 24,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${color ? `icon-${color}` : ''} ${className ?? ''}`.trim()}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowDownIcon;
