import React from 'react';
import './header.scss';

const Header = () => {
  return (
    <div className="header__wrapper">
      <h1 className="header__title">Tolkien Manager</h1>
      <p className="header__logout-button">Sair</p>
    </div>
  );
};

export default Header;
