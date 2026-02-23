import React from 'react';
import cn from 'classnames';
import Loader from '../Loader'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  loading,
  disabled,
  onClick,
  ...rest
}) => {
  const isDisabled = Boolean(disabled || loading );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  return (
    <button
      {...rest}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(
        'text-button',
        'button',
        {'button-disabled': (loading && disabled) || disabled},
        { 'button--loading': loading },
        className
      )}
    >
      {loading && <Loader className="loader-white" size="s" />}
      {children}
    </button>
  );
};

export default Button;
