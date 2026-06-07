import React from 'react';
import logoUnefa from '../assets/logo_unefa.jpg';

const Footer = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <footer className="footer">
        <div style={{ width: '100px' }}></div>
        <div 
          className="footer-text" 
          onClick={() => setShowModal(true)}
          style={{ cursor: 'pointer' }}
          title="Ver creadores"
        >
          <strong>Elaborado por ...</strong>
        </div>
        <div className="footer-logo">
          <span>UNEFA</span>
          <img src={logoUnefa} alt="Logo UNEFA" style={{ height: '40px', width: 'auto' }} />
        </div>
      </footer>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="title" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary-blue)' }}>Creadores</h2>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: '1.8' }}>
              <li><strong>Diseñador/es</strong></li>
              <li>...</li>
              <li><strong>Desarrollador/es</strong></li>
              <li>...</li>
            </ul>
            <button className="btn btn-blue" style={{ marginTop: '2rem' }} onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
