import React from 'react';
import Card from './Card';

const Biblioteca = () => (
  <main className="main-content">
    <h1 className="title">Biblioteca</h1>
    <div className="cards-grid cols-3">
      <Card type="blue" number="1" title="1er Año" actionText="Ver Contenido" to="#" />
      <Card type="white" number="2" title="2do Año" actionText="Ver Contenido" to="#" />
      <Card type="blue" number="3" title="3er Año" actionText="Ver Contenido" to="#" />
      <Card type="white" number="4" title="4to Año" actionText="Ver Contenido" to="#" />
      <Card type="blue" number="5" title="5to Año" actionText="Ver Contenido" to="#" />
    </div>
  </main>
);

export default Biblioteca;
