import React, {useState} from 'react';
import ModalComponent from '../Modal/ModalComponent';
import styles from './Footer.module.css';
import ReactMarkdown from 'react-markdown';
import IconElement from '../IconElement/IconElement'; // Import the IconElement component

interface LinkElement {
  title: string;
  description?: string;
  href: string;
  icon: string;
  modal?: string;
  modalMarkdownContent?: string;
}

interface Copyright {
  text: string;
}

interface FooterProps {
  copyright: Copyright;
  linkElements: LinkElement[];
}

const Footer: React.FC<FooterProps> = ({copyright, linkElements}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content: string) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (<footer className={styles.footer}>
      {/* Copyright first */}
      <div className={styles.footerCopyright}>{copyright.text}</div>

      {/* Link elements */}
      <div className={styles.footerLinks}>
        {linkElements.map((element, index) => (<div key={index} className={styles.footerElement}>
            {element.modal === 'true' ? (// If it's a modal link, render a div that can be clicked to open a modal
              <div onClick={() => openModal(element.modalMarkdownContent || '')}>
                <IconElement icon={element.icon} title={element.title}/>
                {element.title}
              </div>) : (<a href={element.href} target="_blank" rel="noopener noreferrer">
                <IconElement icon={element.icon} title={element.title}/>
                {element.title}
              </a>)}
          </div>))}
      </div>

      <ModalComponent isOpen={modalIsOpen} contentLabel="Modal" onRequestClose={closeModal}>
        <ReactMarkdown>{modalContent}</ReactMarkdown>
      </ModalComponent>
    </footer>);
};

export default Footer;
