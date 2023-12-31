import React from 'react';
import styles from './SocialMediaSection.module.css';
import SocialMediaElement from '../Element/SocialMediaElement';

interface SocialMediaSectionProps {
  socialMediaElements: { href: string }[];
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({socialMediaElements}) => {
  return (<div className={`${styles.socialMediaSection}`}>
      {socialMediaElements.map((element, index) => (<SocialMediaElement key={index} href={element.href}/>))}
    </div>);
};

export default SocialMediaSection;
