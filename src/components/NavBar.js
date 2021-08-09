import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <NavLink exact to="/" className="link" activeClassName="link-active">Accueil</NavLink>
    </div>
  );
};

export default NavBar;