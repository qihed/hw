import React from 'react';
import Text from 'components/Text';
import cn from 'classnames';
import styles from 'components/Card/Card.module.scss';

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
    <div className={cn(styles.card, className)} onClick={onClick}>
      <div className={styles.imgPlacehold}>
        <img src={image} alt="товар" className={styles.imgCard} />
      </div>
      <div className={styles.cardBody}>
        {captionSlot && (
          <Text tag="p" className={styles.cardCaptionSlot} maxLines={2}>
            {captionSlot}
          </Text>
        )}
        <Text tag="h3" className={styles.cardTitle} maxLines={2}>
          {title}
        </Text>
        <Text tag="p" className={styles.cardSubtitle} maxLines={3}>
          {subtitle}
        </Text>
      </div>
      {(contentSlot || actionSlot) && (
        <div className={styles.cardFooter}>
          {contentSlot && (
            <div className={styles.cardContentSlot}>
              <Text tag="h3" className={styles.cardContentSlot} maxLines={1}>
                {contentSlot}
              </Text>
            </div>
          )}
          {actionSlot && <div className={styles.cardActionSlot}>{actionSlot}</div>}
        </div>
      )}
    </div>
  );
};

export default Card;
