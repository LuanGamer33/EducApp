import React from 'react';
import Card from './Card';
import arqSvg from '../assets/svg/cat_arq.svg';
import redesSvg from '../assets/svg/cat_redes.svg';
import progSvg from '../assets/svg/cat_prog.svg';
import logicaSvg from '../assets/svg/cat_logica.svg';
import todoSvg from '../assets/svg/cat_todo.svg';

const QuizCategorias = () => (
  <main className="main-content">
    <h1 className="title">Quiz: Categorías</h1>
    <div className="cards-grid cols-3">
      <Card 
        type="blue" 
        icon={<img src={arqSvg} alt="Arquitectura del computador" style={{ width: '80px', height: '80px' }} />} 
        title="Arquitectura del computador" 
        actionText="Jugar" 
        to="/quiz/arquitectura" 
      />
      <Card 
        type="white" 
        icon={<img src={redesSvg} alt="Redes" style={{ width: '80px', height: '80px' }} />} 
        title="Redes" 
        actionText="Jugar" 
        to="/quiz/redes" 
      />
      <Card 
        type="blue" 
        icon={<img src={progSvg} alt="Programación" style={{ width: '80px', height: '80px' }} />} 
        title="Programación" 
        actionText="Jugar" 
        to="/quiz/programacion" 
      />
      <Card 
        type="white" 
        icon={<img src={logicaSvg} alt="Lógica" style={{ width: '80px', height: '80px' }} />} 
        title="Lógica" 
        actionText="Jugar" 
        to="/quiz/logica" 
      />
      <Card 
        type="blue" 
        icon={<img src={todoSvg} alt="Todo en general" style={{ width: '80px', height: '80px' }} />} 
        title="Todo en general" 
        actionText="Jugar" 
        to="/quiz/todo" 
      />
    </div>
  </main>
);

export default QuizCategorias;
