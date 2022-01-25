import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';

const logo = 'https://reactjs.org/icons/icon-48x48.png?v=f4d46f030265b4c48a05c999b8d93791';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainer = useRef(null);
  const linksRef = useRef(null);
  
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksContainer);
    console.log(linksContainer.current.style);
    if (showLinks) {
      linksContainer.current.style.height = `${linksHeight}px`;
    } else {
      linksContainer.current.style.height = '0px';
    }
  }, [showLinks]);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainer}>
          <ul className='links' ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className='social-container'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;