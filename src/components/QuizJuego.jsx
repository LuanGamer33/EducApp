import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import starSvg from '../assets/svg/topologia_estrella.svg';
import meshSvg from '../assets/svg/topologia_malla.svg';
import busSvg from '../assets/svg/topologia_bus.svg';

const questionsData = {
  arquitectura: [
    {
      q: "1- ¿Cuál es el componente principal encargado de realizar los cálculos y procesar las instrucciones del computador?",
      options: [
        { key: "a", text: "Memoria RAM", value: "ram" },
        { key: "b", text: "Procesador (CPU)", value: "cpu" },
        { key: "c", text: "Disco Duro (HDD)", value: "hdd" }
      ],
      answer: "b"
    },
    {
      q: "2- ¿Qué tipo de memoria es volátil y almacena temporalmente los datos con los que el procesador está trabajando?",
      options: [
        { key: "a", text: "Memoria RAM", value: "ram" },
        { key: "b", text: "Memoria ROM", value: "rom" },
        { key: "c", text: "Memoria Flash", value: "flash" }
      ],
      answer: "a"
    },
    {
      q: "3- ¿Cuál de los siguientes componentes se considera almacenamiento secundario no volátil?",
      options: [
        { key: "a", text: "Tarjeta Gráfica", value: "gpu" },
        { key: "b", text: "Memoria Caché", value: "cache" },
        { key: "c", text: "Disco SSD", value: "ssd" }
      ],
      answer: "c"
    },
    {
      q: "4- ¿Qué componente distribuye la corriente eléctrica a toda la placa base y demás periféricos internos?",
      options: [
        { key: "a", text: "Placa Madre", value: "mobo" },
        { key: "b", text: "Fuente de Poder", value: "psu" },
        { key: "c", text: "Disipador de calor", value: "fan" }
      ],
      answer: "b"
    },
    {
      q: "5- ¿Cuál es la placa de circuito impreso principal a la que se conectan todos los componentes del computador?",
      options: [
        { key: "a", text: "Tarjeta Madre (Motherboard)", value: "motherboard" },
        { key: "b", text: "Tarjeta de Sonido", value: "soundcard" },
        { key: "c", text: "Memoria RAM", value: "ram" }
      ],
      answer: "a"
    }
  ],
  redes: [
    {
      q: "1- Seleccione la topología de bus:",
      options: [
        { key: "a", isSvg: "star", value: "estrella" },
        { key: "b", isSvg: "mesh", value: "malla" },
        { key: "c", isSvg: "bus", value: "bus" }
      ],
      answer: "c"
    },
    {
      q: "2- ¿Qué dispositivo de red se encarga de interconectar múltiples redes y dirigir los paquetes de datos entre ellas?",
      options: [
        { key: "a", text: "Router", value: "router" },
        { key: "b", text: "Switch", value: "switch" },
        { key: "c", text: "Repetidor", value: "repeater" }
      ],
      answer: "a"
    },
    {
      q: "3- ¿Cuál de las siguientes es una dirección IP privada común utilizada para configurar redes locales?",
      options: [
        { key: "a", text: "8.8.8.8", value: "google_dns" },
        { key: "b", text: "192.168.1.1", value: "local_ip" },
        { key: "c", text: "142.250.1.1", value: "public_ip" }
      ],
      answer: "b"
    },
    {
      q: "4- ¿Qué protocolo de red permite la transferencia segura y cifrada de hipertexto (páginas web)?",
      options: [
        { key: "a", text: "HTTP", value: "http" },
        { key: "b", text: "HTTPS", value: "https" },
        { key: "c", text: "FTP", value: "ftp" }
      ],
      answer: "b"
    },
    {
      q: "5- ¿Qué tipo de medio de transmisión transmite datos mediante pulsos de luz, ofreciendo altísimas velocidades?",
      options: [
        { key: "a", text: "Cable de Fibra Óptica", value: "fiber" },
        { key: "b", text: "Cable Coaxial", value: "coaxial" },
        { key: "c", text: "Cable UTP (Cobre)", value: "utp" }
      ],
      answer: "a"
    }
  ],
  programacion: [
    {
      q: "1- ¿Qué palabra clave se introdujo en ES6 (JavaScript) para declarar variables locales reasignables?",
      options: [
        { key: "a", text: "const", value: "const" },
        { key: "b", text: "let", value: "let" },
        { key: "c", text: "var", value: "var" }
      ],
      answer: "b"
    },
    {
      q: "2- ¿Cuál es el resultado de evaluar `typeof []` en JavaScript?",
      options: [
        { key: "a", text: "'array'", value: "array" },
        { key: "b", text: "'object'", value: "object" },
        { key: "c", text: "'list'", value: "list" }
      ],
      answer: "b"
    },
    {
      q: "3- ¿Qué estructura de repetición ejecuta un bloque de código al menos una vez antes de verificar la condición?",
      options: [
        { key: "a", text: "while", value: "while" },
        { key: "b", text: "for", value: "for" },
        { key: "c", text: "do ... while", value: "dowhile" }
      ],
      answer: "c"
    },
    {
      q: "4- ¿Qué etiqueta HTML se usa para referenciar y cargar un archivo JavaScript externo?",
      options: [
        { key: "a", text: "<script>", value: "script" },
        { key: "b", text: "<link>", value: "link" },
        { key: "c", text: "<code>", value: "code" }
      ],
      answer: "a"
    },
    {
      q: "5- ¿Qué es una función recursiva?",
      options: [
        { key: "a", text: "Una función que no devuelve ningún valor", value: "void" },
        { key: "b", text: "Una función que se llama a sí misma", value: "self" },
        { key: "c", text: "Una función que recibe otra función como parámetro", value: "callback" }
      ],
      answer: "b"
    }
  ],
  logica: [
    {
      q: "1- Si las entradas de una compuerta lógica AND son A = 1 y B = 0, ¿cuál es la salida?",
      options: [
        { key: "a", text: "1 (Verdadero)", value: "true" },
        { key: "b", text: "0 (Falso)", value: "false" },
        { key: "c", text: "Indefinido", value: "null" }
      ],
      answer: "b"
    },
    {
      q: "2- ¿Qué compuerta lógica produce un 0 únicamente cuando todas sus entradas son 1?",
      options: [
        { key: "a", text: "Compuerta NAND", value: "nand" },
        { key: "b", text: "Compuerta OR", value: "or" },
        { key: "c", text: "Compuerta XOR", value: "xor" }
      ],
      answer: "a"
    },
    {
      q: "3- Si P es verdadero y Q es falso, ¿cuál es el valor de verdad del condicional P → Q (P implica Q)?",
      options: [
        { key: "a", text: "Verdadero", value: "true" },
        { key: "b", text: "Falso", value: "false" },
        { key: "c", text: "Indeterminado", value: "unknown" }
      ],
      answer: "b"
    },
    {
      q: "4- ¿Qué número en base 10 representa el binario 1101?",
      options: [
        { key: "a", text: "11", value: "11" },
        { key: "b", text: "13", value: "13" },
        { key: "c", text: "15", value: "15" }
      ],
      answer: "b"
    },
    {
      q: "5- ¿Cuál es la tabla de verdad de la negación (NOT) del valor 1?",
      options: [
        { key: "a", text: "0", value: "zero" },
        { key: "b", text: "1", value: "one" },
        { key: "c", text: "Falso y Verdadero", value: "both" }
      ],
      answer: "a"
    }
  ]
};

const categoryNames = {
  arquitectura: 'Arquitectura del computador',
  redes: 'REDES',
  programacion: 'Programación',
  logica: 'Lógica',
  todo: 'Todo en general'
};

const QuizJuego = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [scoreboard, setScoreboard] = useState([]);

  // Initialize and load questions
  useEffect(() => {
    let list = [];
    if (categoria === 'todo') {
      const allQ = [
        ...questionsData.arquitectura,
        ...questionsData.redes,
        ...questionsData.programacion,
        ...questionsData.logica
      ];
      const shuffled = [...allQ].sort(() => 0.5 - Math.random());
      list = shuffled.slice(0, 5).map((q, idx) => ({ ...q, q: `${idx + 1}- ${q.q.substring(3)}` }));
    } else {
      list = questionsData[categoria] || [];
    }
    setQuestions(list);
    setCurrentIdx(0);
    setScore(0);
    setTimer(0);
    setIsEvaluated(false);
    setSelectedOpt(null);
  }, [categoria]);

  // Timer
  useEffect(() => {
    if (showModal) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  // Scoreboard logic
  useEffect(() => {
    const key = `scoreboard_quiz`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setScoreboard(JSON.parse(stored));
    } else {
      const defaultScoreboard = [
        { name: 'Luan', category: 'Redes', pts: 45 },
        { name: 'Pedro', category: 'Arq. Computador', pts: 35 },
        { name: 'Ana', category: 'Lógica', pts: 30 }
      ];
      localStorage.setItem(key, JSON.stringify(defaultScoreboard));
      setScoreboard(defaultScoreboard);
    }
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectOption = (optKey) => {
    if (isEvaluated) return;
    setSelectedOpt(optKey);
  };

  const handleEvaluate = () => {
    if (!selectedOpt) return;

    if (!isEvaluated) {
      const currentQuestion = questions[currentIdx];
      if (selectedOpt === currentQuestion.answer) {
        setScore((s) => s + 15);
      }
      setIsEvaluated(true);
    } else {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((i) => i + 1);
        setSelectedOpt(null);
        setIsEvaluated(false);
      } else {
        setShowModal(true);
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

    localStorage.setItem(`scoreboard_quiz`, JSON.stringify(updated));
    setScoreboard(updated);
    setShowModal(false);
    navigate('/quiz');
  };

  const handleResetScoreboard = () => {
    const emptyScoreboard = [];
    localStorage.setItem(`scoreboard_quiz`, JSON.stringify(emptyScoreboard));
    setScoreboard(emptyScoreboard);
  };

  const renderSvg = (svgName) => {
    if (svgName === 'star') return <img src={starSvg} alt="Estrella" style={{ width: '100px', height: '100px' }} />;
    if (svgName === 'mesh') return <img src={meshSvg} alt="Malla" style={{ width: '100px', height: '100px' }} />;
    if (svgName === 'bus') return <img src={busSvg} alt="Bus" style={{ width: '100px', height: '100px' }} />;
    return null;
  };

  if (questions.length === 0) {
    return <main className="main-content"><h1 className="title">Cargando...</h1></main>;
  }

  const currentQuestion = questions[currentIdx];

  return (
    <main className="main-content">
      <div className="game-layout">
        {/* Scoreboard Sidebar Left */}
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

        {/* Game Main Area */}
        <div className="game-main">
          <div className="game-title-banner">
            <h2>Categoría: {categoryNames[categoria] || categoria}</h2>
          </div>

          <div className="game-stats-bar">
            <span className="stat-badge">Puntos acumulados: {score} / {questions.length * 15} pts</span>
            <span className="stat-badge">Tiempo: {formatTime(timer)}</span>
          </div>

          <div className="quiz-question-container">
            <div className="quiz-question">{currentQuestion.q}</div>

            <div className="quiz-options">
              {currentQuestion.options.map((opt) => {
                let cardClass = "quiz-option-card";
                if (selectedOpt === opt.key) {
                  cardClass += " selected";
                }
                if (isEvaluated) {
                  if (opt.key === currentQuestion.answer) {
                    cardClass += " correct";
                  } else if (selectedOpt === opt.key) {
                    cardClass += " incorrect";
                  }
                }

                return (
                  <div 
                    key={opt.key} 
                    className={cardClass}
                    onClick={() => handleSelectOption(opt.key)}
                  >
                    <div className="quiz-option-tag">{opt.key})</div>
                    <div className="quiz-option-content">
                      {opt.isSvg ? (
                        renderSvg(opt.isSvg)
                      ) : (
                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center' }}>{opt.text}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              className={`btn btn-yellow`}
              style={{ padding: '0.75rem 3rem', fontSize: '1.2rem', minWidth: '200px' }}
              disabled={!selectedOpt}
              onClick={handleEvaluate}
            >
              {isEvaluated ? (currentIdx + 1 < questions.length ? "Siguiente" : "Terminar") : "Evaluar"}
            </button>
          </div>
        </div>
      </div>

      {/* Finishing Game Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="title" style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>¡Juego Terminado!</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
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

export default QuizJuego;
