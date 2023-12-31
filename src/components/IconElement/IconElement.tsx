import React from 'react';

interface IconElementProps {
  icon: string;
  title: string;
}

const IconElement: React.FC<IconElementProps> = ({icon, title}) => {
  const isFontAwesomeIcon = icon.startsWith('fa-') || icon.startsWith('fab ');

  return (<div className="icon-element">
      {isFontAwesomeIcon ? (<i className={`fas ${icon}`} title={title}></i>) : (<img src={icon} alt={title}/>)}
    </div>);
};

export default IconElement;
