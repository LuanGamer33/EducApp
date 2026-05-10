import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import logoUnefa from './assets/logo_unefa.jpg';
import logoTecnico from './assets/logo_tecnico.png';  

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

const Footer = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <footer className="footer">
        <div style={{width: '100px'}}></div>
        <div 
          className="footer-text" 
          onClick={() => setShowModal(true)}
          style={{cursor: 'pointer'}}
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
            <h2 className="title" style={{fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary-blue)'}}>Creadores</h2>
            <ul style={{listStyle: 'none', padding: 0, fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: '1.8'}}>
              <li><strong>Diseñador/es</strong></li>
              <li>...</li>
              <li><strong>Desarrollador/es</strong></li>
              <li>...</li>
            </ul>
            <button className="btn btn-blue" style={{marginTop: '2rem'}} onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};



const Card = ({ type, title, actionText, to, icon, number }) => {
  const navigate = useNavigate();
  return (
    <div className={`card ${type}`} onClick={() => navigate(to)} style={{cursor: 'pointer'}}>
      <div className="card-top-bar"></div>
      
      {number && <div className="card-number">{number}</div>}
      {icon && <div className="card-icon" style={{marginBottom: '1rem'}}>{icon}</div>}
      
      <div className="card-title">{title}</div>
      <button className="btn btn-yellow" onClick={(e) => { e.stopPropagation(); navigate(to); }}>
        {actionText}
      </button>
    </div>
  );
};

const Inicio = () => (
  <main className="main-content">
    <h1 className="title">Bienvenido</h1>
    <div className="cards-grid cols-2">
      <Card type="blue" title="Minijuegos" actionText="Iniciar" to="/minijuegos" />
      <Card type="white" title="Biblioteca" actionText="Iniciar" to="/biblioteca" />
    </div>
  </main>
);

const Minijuegos = () => (
  <main className="main-content">
    <h1 className="title">Minijuegos</h1>
    <div className="cards-grid cols-2">
      <Card type="blue" title="Quiz" actionText="Jugar" to="#" />
      <Card type="white" title="Memorias" actionText="Jugar" to="#" />
    </div>
  </main>
);

const Biblioteca = () => (
  <main className="main-content">
    <h1 className="title">Biblioteca</h1>
  </main>
);

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/minijuegos" element={<Minijuegos />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
