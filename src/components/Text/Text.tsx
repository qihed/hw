import * as React from 'react';

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

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag,
  weight,
  children,
  color,
  maxLines,
}) => {
  const Tag = tag ?? 'p';
  
  const clampStyle =
    typeof maxLines === 'number'
      ? ({ '--text-lines': maxLines } as React.CSSProperties)
      : undefined;

  const classes = [
    'text',
    view ? `text-view-${view}` : '',
    weight ? `text-${weight}` : '',
    color ? `text-color-${color}` : '',
    maxLines ? 'text--clamp' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} style={clampStyle}>
      {children}
    </Tag>
  );
};

export default Text;
