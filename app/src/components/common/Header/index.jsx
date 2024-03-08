/** @jsxImportSource @emotion/react */
import React from 'react';
import { ReactSVG } from 'react-svg';
import logo from '../../../svg/logo-inline.svg';
import { headerStyle, navListStyle, navItemStyle } from './Headerstyles';

function Header() {
  return (
    <header css={headerStyle}>
      <div>
        <ReactSVG src={logo} />
      </div>
      <nav>
        <ul css={navListStyle}>
          <li css={navItemStyle}><a>About Us</a></li>
          <li css={navItemStyle}><a>Resources</a></li>
          <li css={navItemStyle}><a>Contact</a></li>
          <li css={navItemStyle}><a>Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
