import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import config from './config/config.json';
import siteData from './data/siteData.json';
import './index.css';
import App from './App';

function loadTheme() {
  let theme = config.theme;

  if (theme === 'auto') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  import(`./colorThemes/${theme}.css`).then(() => {
    document.documentElement.setAttribute('data-theme', theme);
  });
}

function setMetaTags() {
  if (!config.searchEngineIndexing) {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);
  }

  // Set site-specific meta tags
  document.title = siteData.title;
  const metaDescription = document.createElement('meta');
  metaDescription.name = 'description';
  metaDescription.content = siteData.description;
  document.head.appendChild(metaDescription);

  const metaLanguage = document.createElement('meta');
  metaLanguage.httpEquiv = 'Content-Language';
  metaLanguage.content = siteData.language;
  document.head.appendChild(metaLanguage);

  const metaOgImage = document.createElement('meta');
  metaOgImage.content = siteData.ogImage;
  document.head.appendChild(metaOgImage);

  siteData.additionalMetaTags.forEach(tag => {
    const meta = document.createElement('meta');
    meta.name = tag.name || '';
    meta.content = tag.content;
    document.head.appendChild(meta);
  });
}

loadTheme();
setMetaTags();

ReactDOM.render(<React.StrictMode>
  <App/>
</React.StrictMode>, document.getElementById('root'));
