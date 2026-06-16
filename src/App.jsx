import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import Minijuegos from './components/Minijuegos';
import Biblioteca from './components/Biblioteca';
import BibliotecaDetalle from './components/BibliotecaDetalle';
import QuizCategorias from './components/QuizCategorias';
import QuizJuego from './components/QuizJuego';
import MemoriasCategorias from './components/MemoriasCategorias';
import MemoriasJuego from './components/MemoriasJuego';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/minijuegos" element={<Minijuegos />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/biblioteca/:moduloId" element={<BibliotecaDetalle />} />
          <Route path="/quiz" element={<QuizCategorias />} />
          <Route path="/quiz/:categoria" element={<QuizJuego />} />
          <Route path="/memorias" element={<MemoriasCategorias />} />
          <Route path="/memorias/:categoria" element={<MemoriasJuego />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
