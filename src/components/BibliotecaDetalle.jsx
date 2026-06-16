import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bibliotecaData from './bibliotecaData.json';

// ==========================================
// SVG Icons Imports
// ==========================================
import sereSvg from '../assets/svg/sere.svg';
import bugSvg from '../assets/svg/bug.svg';
import firewallSvg from '../assets/svg/firewall.svg';
import routerSvg from '../assets/svg/router.svg';
import webSvg from '../assets/svg/web.svg';
import ipSvg from '../assets/svg/ip.svg';
import servidorSvg from '../assets/svg/servidor.svg';
import wifiSvg from '../assets/svg/wifi.svg';
import switchSvg from '../assets/svg/switch.svg';
import sateliteSvg from '../assets/svg/satelite.svg';
import nubeSvg from '../assets/svg/nube.svg';
import algoSvg from '../assets/svg/algo.svg';
import condSvg from '../assets/svg/cond.svg';
import diagSvg from '../assets/svg/diag.svg';
import monitorSvg from '../assets/svg/monitor.svg';
import cpuSvg from '../assets/svg/cpu.svg';
import ramSvg from '../assets/svg/ram.svg';
import ssdSvg from '../assets/svg/ssd.svg';
import moboSvg from '../assets/svg/mobo.svg';
import gpuSvg from '../assets/svg/gpu.svg';
import tecladoSvg from '../assets/svg/teclado.svg';
import usbSvg from '../assets/svg/usb.svg';

// ==========================================
// Icon Lookup Mapping
// ==========================================
const iconMap = {
  sere: sereSvg,
  bug: bugSvg,
  firewall: firewallSvg,
  router: routerSvg,
  web: webSvg,
  ip: ipSvg,
  servidor: servidorSvg,
  wifi: wifiSvg,
  switch: switchSvg,
  satelite: sateliteSvg,
  nube: nubeSvg,
  algo: algoSvg,
  cond: condSvg,
  diag: diagSvg,
  monitor: monitorSvg,
  cpu: cpuSvg,
  ram: ramSvg,
  ssd: ssdSvg,
  mobo: moboSvg,
  gpu: gpuSvg,
  teclado: tecladoSvg,
  usb: usbSvg,
};

// ==========================================
// Static Helper Functions (Outside Component)
// ==========================================

/**
 * Removes forbidden words ("tema", "modulo", "unidad") and numeric prefixes (like 1.1)
 */
const cleanBannedWords = (text) => {
  if (!text) return '';
  return text
    // Remove "modulo X", "módulo X", "unidad X", "tema X" (case-insensitive)
    .replace(/\b(módulos?|modulos?|unidades?|temas?)\b\s*\d*[-.:\s]*/gi, '')
    // Remove numeric section prefixes like "1.1- ", "6.3.2 - "
    .replace(/^\s*\b\d+\.\d+(\.\d+)?[-.:\s]*/gm, '');
};

/**
 * Parses br tags (<br>, <br/>, <br />) into JSX <br /> elements
 */
const parseLineBreaks = (text, keyPrefix) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/<br\s*\/?>/i);
  return parts.reduce((acc, part, idx) => {
    if (idx > 0) {
      acc.push(<br key={`${keyPrefix}-br-${idx}`} />);
    }
    acc.push(part);
    return acc;
  }, []);
};

/**
 * Parses inline code snippets enclosed in backticks (`) to HTML <code> elements
 */
const parseInlineCode = (text, keyPrefix) => {
  const parts = text.split('`');
  return parts.flatMap((part, index) => {
    if (index % 2 === 1) {
      return [
        <code key={`${keyPrefix}-code-${index}`} className="inline-code">
          {part}
        </code>
      ];
    }
    return parseLineBreaks(part, `${keyPrefix}-part-${index}`);
  });
};

/**
 * Parses bold markdown text (**text**) to HTML <strong> elements
 */
const parseInlineBold = (text) => {
  const parts = text.split('**');
  return parts.flatMap((part, index) => {
    const cleanedPart = cleanBannedWords(part);
    if (index % 2 === 1) {
      return [
        <strong key={`bold-${index}`}>
          {parseInlineCode(cleanedPart, `bold-${index}`)}
        </strong>
      ];
    }
    return parseInlineCode(cleanedPart, `normal-${index}`);
  });
};

/**
 * Parses a complete markdown block (lists, tables, quotes, code, paragraphs)
 * and returns React JSX elements.
 */
const renderContent = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let inList = false;
  let codeLines = [];
  let inCode = false;
  let inTable = false;
  let tableHeaders = [];
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCode) {
        inCode = false;
        elements.push(
          <pre key={`codeblock-${i}`} className="code-block">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    // Handle Tables
    if (line.trim().startsWith('|')) {
      if (inList) {
        elements.push(<ul key={`ul-${i}`} className="content-ul">{listItems}</ul>);
        inList = false;
      }
      if (!inTable) {
        inTable = true;
        tableHeaders = [];
        tableRows = [];
      }
      
      // Parse row cells
      const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Skip delimiter row like |---|---|
      if (cells.every(c => c.match(/^[-:]+$/))) {
        continue;
      }
      
      if (tableHeaders.length === 0) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      if (inTable) {
        elements.push(
          <div key={`table-wrapper-${i}`} className="table-responsive">
            <table className="content-table">
              <thead>
                <tr>
                  {tableHeaders.map((header, hIdx) => (
                    <th key={hIdx}>{parseInlineBold(header)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{parseInlineBold(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }
    }

    // Handle Blockquotes
    if (line.trim().startsWith('> ')) {
      const quoteText = line.substring(2);
      elements.push(
        <blockquote key={`quote-${i}`} className="content-blockquote">
          {parseInlineBold(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Handle Subheadings inside text (## or ###)
    if (line.trim().startsWith('## ') || line.trim().startsWith('### ')) {
      const titleText = line.replace(/^##+\s+/, '');
      elements.push(
        <h3 key={`h3-${i}`} className="content-h3">
          {parseInlineBold(titleText)}
        </h3>
      );
      continue;
    }

    // Handle Lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      const itemText = line.replace(/^([-*•]|\\*)\s+/, '');
      listItems.push(
        <li key={`li-${i}-${listItems.length}`} className="content-li">
          {parseInlineBold(itemText)}
        </li>
      );
      continue;
    } else {
      if (inList) {
        elements.push(
          <ul key={`ul-${i}`} className="content-ul">
            {listItems}
          </ul>
        );
        inList = false;
      }
    }

    // Empty Lines
    if (line.trim() === '') {
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p key={`p-${i}`} className="content-p">
        {parseInlineBold(line)}
      </p>
    );
  }

  // Wrap-up leftover list or table at file end
  if (inList) {
    elements.push(<ul key="ul-end" className="content-ul">{listItems}</ul>);
  }
  if (inTable) {
    elements.push(
      <div key="table-wrapper-end" className="table-responsive">
        <table className="content-table">
          <thead>
            <tr>
              {tableHeaders.map((header, hIdx) => (
                <th key={hIdx}>{parseInlineBold(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{parseInlineBold(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return elements;
};

// ==========================================
// Main React Component
// ==========================================
const BibliotecaDetalle = () => {
  const { moduloId } = useParams();
  const navigate = useNavigate();
  const moduleData = bibliotecaData[moduloId];

  // Route fallback if module does not exist
  if (!moduleData) {
    return (
      <main className="main-content">
        <h1 className="title">Contenido No Encontrado</h1>
        <button className="btn btn-yellow" onClick={() => navigate('/biblioteca')}>
          Volver a Biblioteca
        </button>
      </main>
    );
  }

  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const scrollContainerRef = useRef(null);

  // Reset topic index when changing modules
  useEffect(() => {
    setActiveTopicIndex(0);
  }, [moduloId]);

  // Scroll to top of reading area when topic index or module changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTopicIndex, moduloId]);

  const topics = moduleData.topics;
  const currentTopic = topics[activeTopicIndex];
  const iconUrl = iconMap[currentTopic?.iconName];

  // Navigation handlers
  const handleNext = () => {
    setActiveTopicIndex((prev) => (prev + 1) % topics.length);
  };

  const handlePrev = () => {
    setActiveTopicIndex((prev) => (prev - 1 + topics.length) % topics.length);
  };

  return (
    <main className="main-content">
      {/* Header Banner - Module Title */}
      <div className="modulo-header-banner">
        <h1 className="modulo-title">{cleanBannedWords(moduleData.title)}</h1>
      </div>

      {/* Main Content Layout Container */}
      <div className="biblioteca-detalle-panel">
        
        {/* Collapsible Sidebar - Topic Selector */}
        <div className={`modulo-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-header">
            <h3>Contenido</h3>
            <button 
              className="btn-toggle-sidebar" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? "Colapsar" : "Expandir"}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
          <div className="sidebar-content">
            <ul className="topics-list">
              {topics.map((topic, index) => {
                const isActive = index === activeTopicIndex;
                const cleanedTopicTitle = cleanBannedWords(topic.title);
                return (
                  <li 
                    key={index} 
                    className={`topic-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTopicIndex(index)}
                  >
                    <span className="topic-text">{cleanedTopicTitle}</span>
                    <span className="topic-arrow">➔</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Tab to reopen Sidebar when collapsed */}
        {!sidebarOpen && (
          <button 
            className="sidebar-collapsed-tab" 
            onClick={() => setSidebarOpen(true)}
            title="Expandir"
          >
            ▶
          </button>
        )}

        {/* Topic Reading Area */}
        <div className="modulo-reading-area">
          <div className="reading-scroll-container" ref={scrollContainerRef}>
            <div className="reading-grid">
              
              {/* Left Column: Markdown content */}
              <div className="reading-text-col">
                <h2 className="topic-reading-title">{cleanBannedWords(currentTopic?.title)}</h2>
                <div className="markdown-parsed-body">
                  {renderContent(currentTopic?.content)}
                </div>
              </div>

              {/* Right Column: Visual illustration */}
              <div className="reading-visual-col">
                {iconUrl && (
                  <div className="topic-illustration-container">
                    <img 
                      src={iconUrl} 
                      alt={cleanBannedWords(currentTopic?.title)} 
                      className="topic-illustration" 
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Reading Area Footer Controls */}
          <div className="reading-footer-bar">
            {/* References Button */}
            <button className="btn btn-yellow" onClick={() => setModalOpen(true)}>
              Ref
            </button>

            {/* Pagination Controls */}
            <div className="pagination-controls">
              <button 
                className="btn-page-arrow prev" 
                onClick={handlePrev}
                title="Anterior"
              >
                ◀
              </button>
              <div className="page-bubble">
                Pág. {activeTopicIndex + 1} / {topics.length}
              </div>
              <button 
                className="btn-page-arrow next" 
                onClick={handleNext}
                title="Siguiente"
              >
                ▶
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* References Modal */}
      {modalOpen && (
        <div className="ref-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="ref-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ref-modal-header">
              <h2>Referencias Educativas</h2>
              <button className="ref-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="ref-modal-body">
              <p>Esta información fue obtenida de las siguientes fuentes oficiales:</p>
              <ul className="ref-links-list">
                {moduleData.references.map((ref, idx) => (
                  <li key={idx} className="ref-link-item">
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="ref-link">
                      {ref.name}
                      <span className="ref-link-icon">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ref-modal-footer">
              <button className="btn btn-blue" onClick={() => setModalOpen(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BibliotecaDetalle;

