import React from 'react';
import cn from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...rest }, ref) => {
    return (
      <div className={cn('input-wrapper', className)}>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
          className={cn('input', className)}
        />
        {afterSlot && <div className="input-afterSlot">{afterSlot}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
