import React from 'react';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
}) => {
  return (
    <div
    className={['card', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <div className="img-placehold">
        <img src={image} alt="товар" className="img-card" />
      </div>
      <div className="card-body">
        {captionSlot && (
          <Text tag="p" className="card-captionSlot" maxLines={2}>
            {captionSlot}
          </Text>
        )}
        <Text tag="h3" className="card-title" maxLines={2}>
          {title}
        </Text>
        <Text tag="p" className="card-subtitle" maxLines={3}>
          {subtitle}
        </Text>
      </div>
      {(contentSlot || actionSlot) && (
        <div className="card-footer">
          {contentSlot && (
            <div className="card-contentSlot">
              <Text tag="h3" className="card-contentSlot" maxLines={1}>
                {contentSlot}
              </Text>
            </div>
          )}
          {actionSlot && <div className="card-actionSlot">{actionSlot}</div>}
        </div>
      )}
    </div>
  );
};

export default Card;
