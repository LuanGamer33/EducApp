import React from 'react';
import Card from './Card';

const Inicio = () => (
  <main className="main-content">
    <h1 className="title">Bienvenido</h1>
    <div className="cards-grid cols-2">
      <Card type="blue" title="Minijuegos" actionText="Iniciar" to="/minijuegos" />
      <Card type="white" title="Biblioteca" actionText="Iniciar" to="/biblioteca" />
    </div>
  </main>
);

export default Inicio;
