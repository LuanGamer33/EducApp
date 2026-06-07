import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ type, title, actionText, to, icon, number }) => {
  const navigate = useNavigate();
  return (
    <div className={`card ${type}`} onClick={() => navigate(to)} style={{ cursor: 'pointer' }}>
      <div className="card-top-bar"></div>
      
      {number && <div className="card-number">{number}</div>}
      {icon && <div className="card-icon" style={{ marginBottom: '1rem' }}>{icon}</div>}
      
      <div className="card-title">{title}</div>
      <button className="btn btn-yellow" onClick={(e) => { e.stopPropagation(); navigate(to); }}>
        {actionText}
      </button>
    </div>
  );
};

export default Card;
