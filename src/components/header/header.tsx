import React, { useContext } from 'react';
import { auth } from '../../firebase';
import { UserContext } from '../../UserProvider';

import './header.scss';

const Header = () => {
  const { user } = useContext(UserContext);

  const showLogout = () => {
    if (user) {
      return (
        <p className="header__logout-button" onClick={() => auth.signOut()}>
          Sair
        </p>
      );
    }

    return null;
  };

  return (
    <div className="header__wrapper">
      <h1 className="header__title">Tolkien Manager</h1>
      {showLogout()}
    </div>
  );
};

export default Header;
