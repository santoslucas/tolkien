import React from 'react';
import { auth } from '../../firebase';
import './header.scss';

const Header = () => {
  return (
    <div className="header__wrapper">
      <h1 className="header__title">Tolkien Manager</h1>
      <p className="header__logout-button" onClick={() => auth.signOut()}>
        Sair
      </p>
    </div>
  );
};

export default Header;
