import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo"></div>
        <div className="header-title">E. T. "PEDRO ARISMENDI BRITO" - ÁREA DE TELEMÁTICA</div>
      </div>
      <div className="header-actions">
        {!isHome && (
          <button className="btn btn-yellow" onClick={() => navigate(-1)}>ATRÁS</button>
        )}
        <button className="btn btn-blue" onClick={() => navigate('/')}>SALIR</button>
      </div>
    </header>
  );
};

export default Header;
