import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import SVG Assets (Architecture)
import svgCpu from '../assets/svg/cpu.svg';
import svgRam from '../assets/svg/ram.svg';
import svgSsd from '../assets/svg/ssd.svg';
import svgPsu from '../assets/svg/psu.svg';
import svgMobo from '../assets/svg/mobo.svg';
import svgGpu from '../assets/svg/gpu.svg';
import svgTeclado from '../assets/svg/teclado.svg';
import svgMouse from '../assets/svg/mouse.svg';
import svgMonitor from '../assets/svg/monitor.svg';
import svgCooler from '../assets/svg/cooler.svg';
import svgRom from '../assets/svg/rom.svg';
import svgUsb from '../assets/svg/usb.svg';

// Import SVG Assets (Redes)
import svgRouter from '../assets/svg/router.svg';
import svgSwitch from '../assets/svg/switch.svg';
import svgServidor from '../assets/svg/servidor.svg';
import svgCable from '../assets/svg/cable.svg';
import svgWifi from '../assets/svg/wifi.svg';
import svgFirewall from '../assets/svg/firewall.svg';
import svgIp from '../assets/svg/ip.svg';
import svgNube from '../assets/svg/nube.svg';
import svgSatelite from '../assets/svg/satelite.svg';
import svgModem from '../assets/svg/modem.svg';
import svgFibra from '../assets/svg/fibra.svg';
import svgRj45 from '../assets/svg/rj45.svg';

// Import SVG Assets (Programación)
import svgJs from '../assets/svg/js.svg';
import svgPy from '../assets/svg/py.svg';
import svgHtml from '../assets/svg/html.svg';
import svgCss from '../assets/svg/css.svg';
import svgDb from '../assets/svg/db.svg';
import svgGit from '../assets/svg/git.svg';
import svgLoop from '../assets/svg/loop.svg';
import svgVar from '../assets/svg/var.svg';
import svgFunc from '../assets/svg/func.svg';
import svgBug from '../assets/svg/bug.svg';
import svgWeb from '../assets/svg/web.svg';
import svgClass from '../assets/svg/class.svg';

// Import SVG Assets (Lógica)
import svgAnd from '../assets/svg/and.svg';
import svgOr from '../assets/svg/or.svg';
import svgNot from '../assets/svg/not.svg';
import svgAlgo from '../assets/svg/algo.svg';
import svgTrue from '../assets/svg/true.svg';
import svgFalse from '../assets/svg/false.svg';
import svgBin from '../assets/svg/bin.svg';
import svgTabla from '../assets/svg/tabla.svg';
import svgCond from '../assets/svg/cond.svg';
import svgDiag from '../assets/svg/diag.svg';
import svgBool from '../assets/svg/bool.svg';
import svgNand from '../assets/svg/nand.svg';

const rawCards = {
  arquitectura: [
    { name: 'Procesador', icon: svgCpu },
    { name: 'Memoria RAM', icon: svgRam },
    { name: 'Disco SSD', icon: svgSsd },
    { name: 'Fuente Poder', icon: svgPsu },
    { name: 'Placa Madre', icon: svgMobo },
    { name: 'T. Gráfica', icon: svgGpu },
    { name: 'Teclado', icon: svgTeclado },
    { name: 'Mouse', icon: svgMouse },
    { name: 'Monitor', icon: svgMonitor },
    { name: 'Ventilador', icon: svgCooler },
    { name: 'Memoria ROM', icon: svgRom },
    { name: 'Puerto USB', icon: svgUsb }
  ],
  redes: [
    { name: 'Router', icon: svgRouter },
    { name: 'Switch', icon: svgSwitch },
    { name: 'Servidor', icon: svgServidor },
    { name: 'Cable Red', icon: svgCable },
    { name: 'Antena Wi-Fi', icon: svgWifi },
    { name: 'Cortafuegos', icon: svgFirewall },
    { name: 'Dirección IP', icon: svgIp },
    { name: 'Nube', icon: svgNube },
    { name: 'Satélite', icon: svgSatelite },
    { name: 'Módem', icon: svgModem },
    { name: 'Fibra Óptica', icon: svgFibra },
    { name: 'Conector RJ45', icon: svgRj45 }
  ],
  programacion: [
    { name: 'JavaScript', icon: svgJs },
    { name: 'Python', icon: svgPy },
    { name: 'HTML', icon: svgHtml },
    { name: 'CSS', icon: svgCss },
    { name: 'Base Datos', icon: svgDb },
    { name: 'Git', icon: svgGit },
    { name: 'Bucle Loop', icon: svgLoop },
    { name: 'Variable', icon: svgVar },
    { name: 'Función', icon: svgFunc },
    { name: 'Bug Código', icon: svgBug },
    { name: 'Página Web', icon: svgWeb },
    { name: 'Clase Objeto', icon: svgClass }
  ],
  logica: [
    { name: 'Compuerta AND', icon: svgAnd },
    { name: 'Compuerta OR', icon: svgOr },
    { name: 'Compuerta NOT', icon: svgNot },
    { name: 'Algoritmo', icon: svgAlgo },
    { name: 'Verdadero (1)', icon: svgTrue },
    { name: 'Falso (0)', icon: svgFalse },
    { name: 'Binario', icon: svgBin },
    { name: 'Tabla Verdad', icon: svgTabla },
    { name: 'Condición', icon: svgCond },
    { name: 'Diagrama Flujo', icon: svgDiag },
    { name: 'Lógica Boole', icon: svgBool },
    { name: 'Compuerta NAND', icon: svgNand }
  ]
};

const categoryNames = {
  arquitectura: 'Arquitectura del computador',
  redes: 'Redes',
  programacion: 'Programación',
  logica: 'Lógica',
  todo: 'Todo en general'
};

const MemoriasJuego = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scoreboard, setScoreboard] = useState([]);

  // Load and prepare cards
  useEffect(() => {
    let source = [];
    if (categoria === 'todo') {
      const all = [
        ...rawCards.arquitectura,
        ...rawCards.redes,
        ...rawCards.programacion,
        ...rawCards.logica
      ];
      source = [...all].sort(() => 0.5 - Math.random()).slice(0, 12);
    } else {
      source = rawCards[categoria] || [];
    }

    const pairs = [];
    source.forEach((card, idx) => {
      pairs.push({
        pairId: idx,
        name: card.name,
        icon: card.icon,
        isFlipped: false,
        isMatched: false
      });
      pairs.push({
        pairId: idx,
        name: card.name,
        icon: card.icon,
        isFlipped: false,
        isMatched: false
      });
    });

    const shuffled = pairs
      .sort(() => 0.5 - Math.random())
      .map((card, idx) => ({ ...card, id: idx }));

    setCards(shuffled);
    setFlippedIndices([]);
    setScore(0);
    setTimer(0);
  }, [categoria]);

  // Timer
  useEffect(() => {
    if (showModal) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  // Scoreboard load
  useEffect(() => {
    const key = `scoreboard_memorias`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setScoreboard(JSON.parse(stored));
    } else {
      const defaultScores = [
        { name: 'Luan', category: 'Redes', pts: 180 },
        { name: 'Pedro', category: 'Arq. Computador', pts: 120 },
        { name: 'Ana', category: 'Lógica', pts: 90 }
      ];
      localStorage.setItem(key, JSON.stringify(defaultScores));
      setScoreboard(defaultScores);
    }
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCardClick = (idx) => {
    if (flippedIndices.length === 2 || cards[idx].isFlipped || cards[idx].isMatched) return;

    const updatedCards = [...cards];
    updatedCards[idx].isFlipped = true;
    setCards(updatedCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const firstIdx = newFlipped[0];
      const secondIdx = newFlipped[1];

      if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setScore((s) => s + 15);

          const allMatched = matchedCards.every((card) => card.isMatched);
          if (allMatched) {
            setShowModal(true);
          }
        }, 300);
      } else {
        setTimeout(() => {
          const flippedBackCards = [...cards];
          flippedBackCards[firstIdx].isFlipped = false;
          flippedBackCards[secondIdx].isFlipped = false;
          setCards(flippedBackCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const handleSaveScore = () => {
    if (!playerName.trim()) return;

    const newEntry = {
      name: playerName,
      category: categoryNames[categoria] || categoria,
      pts: score
    };

    const updated = [...scoreboard, newEntry]
      .sort((a, b) => b.pts - a.pts)
      .slice(0, 3);

    localStorage.setItem(`scoreboard_memorias`, JSON.stringify(updated));
    setScoreboard(updated);
    setShowModal(false);
    navigate('/memorias');
  };

  const handleResetScoreboard = () => {
    const emptyScoreboard = [];
    localStorage.setItem(`scoreboard_memorias`, JSON.stringify(emptyScoreboard));
    setScoreboard(emptyScoreboard);
  };

  if (cards.length === 0) {
    return <main className="main-content"><h1 className="title">Cargando...</h1></main>;
  }

  return (
    <main className="main-content">
      <div className="game-layout">
        {/* Game Main Area */}
        <div className="game-main">
          <div className="game-title-banner">
            <h2>Categoría: {categoryNames[categoria] || categoria}</h2>
          </div>

          <div className="game-stats-bar">
            <span className="stat-badge">Puntos acumulados: {score} / 180 pts</span>
            <span className="stat-badge">Tiempo: {formatTime(timer)}</span>
          </div>

          <div className="memory-grid">
            {cards.map((card, idx) => {
              let cardClass = "memory-card";
              if (card.isFlipped) cardClass += " flipped";
              if (card.isMatched) cardClass += " matched";

              return (
                <div 
                  key={card.id} 
                  className={cardClass}
                  onClick={() => handleCardClick(idx)}
                >
                  <div className="memory-card-inner">
                    <div className="memory-card-front"></div>
                    <div className="memory-card-back">
                      <img src={card.icon} alt={card.name} style={{ width: '45px', height: '45px', marginBottom: '0.25rem' }} />
                      <span>{card.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scoreboard Sidebar Right */}
        <div className="scoreboard-sidebar" style={{ alignSelf: 'flex-start' }}>
          <h3 className="scoreboard-title">Tabla de Puntuación</h3>
          {scoreboard.map((entry, idx) => (
            <div key={idx} className="score-entry">
              <div><strong>Nombre:</strong> {entry.name}</div>
              <div><strong>Categoría:</strong> {entry.category}</div>
              <div><strong>Pts:</strong> {entry.pts}</div>
            </div>
          ))}
          {scoreboard.length === 0 && (
            <div className="score-entry" style={{ textAlign: 'center' }}>Sin puntajes registrados</div>
          )}
          <button 
            className="btn btn-yellow" 
            style={{ width: '100%', fontSize: '0.85rem', marginTop: 'auto', padding: '0.4rem 1rem' }}
            onClick={handleResetScoreboard}
          >
            Limpiar Tabla
          </button>
        </div>
      </div>

      {/* Finishing Game Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="title" style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>¡Juego Terminado!</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              ¡Felicidades! Has encontrado todas las parejas.<br />
              Puntaje final: <strong>{score} pts</strong> en un tiempo de <strong>{formatTime(timer)}</strong>.
            </p>
            <input 
              type="text" 
              className="name-input"
              placeholder="Ingresa tu nombre"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={10}
            />
            <button 
              className="btn btn-blue" 
              style={{ width: '100%' }}
              onClick={handleSaveScore}
              disabled={!playerName.trim()}
            >
              Guardar Puntaje
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MemoriasJuego;
