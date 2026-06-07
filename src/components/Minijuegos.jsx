import React from 'react';
import Card from './Card';

const Minijuegos = () => (
  <main className="main-content">
    <h1 className="title">Minijuegos</h1>
    <div className="cards-grid cols-2">
      <Card type="blue" title="Quiz" actionText="Jugar" to="/quiz" />
      <Card type="white" title="Memorias" actionText="Jugar" to="/memorias" />
    </div>
  </main>
);

export default Minijuegos;
