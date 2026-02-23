import React from 'react';
import cn from 'classnames';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  className,
  checked,
  disabled,
  ...rest
}) => {
  return (
    <label className="checkbox-wrap">
      <input
        {...rest}
        type="checkbox"
        className={cn('checkbox', className)}
        checked={Boolean(checked)}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      {Boolean(checked) && (
        <CheckIcon
          className={cn('checkbox-icon', { 'checkbox-icon-disabled': disabled })}
          width={40}  
          height={40}
        />
      )}
    </label>
  );
};

export default CheckBox;
