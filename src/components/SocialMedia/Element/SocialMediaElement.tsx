import React from 'react';
import styles from './SocialMediaElement.module.css';
import './SocialMediaIcons.css';

interface SocialMediaElementProps {
  href: string;
}

const SocialMediaElement: React.FC<SocialMediaElementProps> = ({href}) => {
  const getPlatformInfo = (url: string) => {
    const platformMappings: Record<string, { platform: string; icon: string }> = {
      'facebook.com': {platform: 'Facebook', icon: 'fab fa-facebook'},
      'twitter.com': {platform: 'Twitter', icon: 'fab fa-twitter'},
      'linkedin.com': {platform: 'LinkedIn', icon: 'fab fa-linkedin'},
      'instagram.com': {platform: 'Instagram', icon: 'fab fa-instagram'},
      'youtube.com': {platform: 'YouTube', icon: 'fab fa-youtube'},
      'pinterest.com': {platform: 'Pinterest', icon: 'fab fa-pinterest'},
      'snapchat.com': {platform: 'SnapChat', icon: 'fab fa-snapchat'},
    };

    for (const [platformURL, info] of Object.entries(platformMappings)) {
      if (url.includes(platformURL)) {
        return info;
      }
    }

    return {platform: 'Unknown', icon: 'fas fa-link'};
  };

  const {platform, icon: platformIcon} = getPlatformInfo(href);
  const title = `Visit ${platform}`;

  return (<a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className={`${styles.socialMediaLink} ${platform.toLowerCase()}`}
    >
      <i className={`${styles.socialMediaIcon} ${platformIcon}`}></i>
    </a>);
};

export default SocialMediaElement;