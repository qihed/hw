import React from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from 'components/MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const isSelected = (opt: Option) => value.some((v) => v.key === opt.key);

  const toggleOption = (opt: Option) => {
    if (isSelected(opt)) {
      onChange(value.filter((v) => v.key !== opt.key));
    } else {
      onChange([...value, opt]);
    }
  };

  const filtered = options.filter((o) => o.value.toLowerCase().includes(query.toLowerCase()));

  const title = getTitle(value);
  const inputValue = isOpen ? query : value.length ? title : '';

  return (
    <div className={className} ref={rootRef}>
      <Input
        value={inputValue}
        afterSlot={<ArrowDownIcon color="secondary" />}
        className={styles.borderStyle}
        onChange={(val) => {
          setQuery(val);
          if (!isOpen) setIsOpen(true);
        }}
        placeholder={value.length ? '' : title}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(true)}
      />

      {isOpen && !disabled && (
        <div className={styles.mddFrame}>
          {filtered.map((opt) => (
            <div className={styles.mddFrameItem} key={opt.key} onClick={() => toggleOption(opt)}>
              <input
                className={styles.noCheckbox}
                type="checkbox"
                readOnly
                checked={isSelected(opt)}
              />
              <span>{opt.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
