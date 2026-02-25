import * as React from 'react';
import styles from 'components/Text.module.scss';
import cn from 'classnames';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag, weight, children, color, maxLines }) => {
  const Tag = tag ?? 'p';

  const VIEW_STYLE_MAP: Record<NonNullable<TextProps['view']>, string> = {
    title: styles.textViewTitle,
    button: styles.textViewButton,
    'p-20': styles.textViewP20,
    'p-18': styles.textViewP18,
    'p-16': styles.textViewP16,
    'p-14': styles.textViewP14,
  };

  const WEIGHT_STYLE_MAP: Record<NonNullable<TextProps['weight']>, string> = {
    normal: styles.textNormal,
    medium: styles.textMedium,
    bold: styles.textBold,
  };

  const COLOR_STYLE_MAP: Record<NonNullable<TextProps['color']>, string> = {
    primary: styles.textColorPrimary,
    secondary: styles.textColorSecondary,
    accent: styles.textColorAccent,
  };

  const clampStyle =
    typeof maxLines === 'number'
      ? ({ '--text-lines': maxLines } as React.CSSProperties)
      : undefined;

  const classes = cn(
    styles.text,
    view && VIEW_STYLE_MAP[view],
    weight && WEIGHT_STYLE_MAP[weight],
    color && COLOR_STYLE_MAP[color],
    maxLines != null && styles.textClamp,
    className
  );

  return (
    <Tag className={classes} style={clampStyle}>
      {children}
    </Tag>
  );
};

export default Text;
