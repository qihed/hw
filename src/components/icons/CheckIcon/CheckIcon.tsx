import * as React from 'react';
import type { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({
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
        d="M4 11.6129L9.87755 18L20 7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CheckIcon;
