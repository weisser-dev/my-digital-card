import React from 'react';
import styles from './CardElement.module.css';
import IconElement from '../IconElement/IconElement';

interface CardElementProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const CardElement: React.FC<CardElementProps> = ({title, description, href, icon}) => {
  return (<div className={styles.cardElement}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
        <div className={styles.cardElementIcon}>
          <IconElement icon={icon} title={title}/>
        </div>
        <div>
          <h5 className={styles.cardTitle}>{title}</h5>
          <p className={styles.cardText}>{description}</p>
        </div>
      </a>
    </div>);
};

export default CardElement;
