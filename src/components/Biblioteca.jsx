import React from 'react';
import Card from './Card';
import sereSvg from '../assets/svg/sere.svg';
import serviSvg from '../assets/svg/servi.svg';
import tecemSvg from '../assets/svg/tecem.svg';
import aureSvg from '../assets/svg/aure.svg';
import alproSvg from '../assets/svg/alpro.svg';
import arcoSvg from '../assets/svg/arco.svg';

const Biblioteca = () => (
  <main className="main-content">
    <h1 className="title">Biblioteca</h1>
    <div className="cards-grid cols-3 biblioteca-grid">
      <Card
        type="blue"
        icon={<img src={sereSvg} alt="Seguridad en Redes" />}
        title="Seguridad en Redes"
        actionText="Ver Contenido"
        to="/biblioteca/seguridad-en-redes"
      />
      <Card
        type="white"
        icon={<img src={serviSvg} alt="Servicios IP, VIP, SIP y Calidad de Servicio" />}
        title="Servicios IP, VIP, SIP y Calidad de Servicio"
        actionText="Ver Contenido"
        to="/biblioteca/servicios-ip-vip-sip-y-qos"
      />
      <Card
        type="blue"
        icon={<img src={tecemSvg} alt="Tecnologías Emergentes" />}
        title="Tecnologías Emergentes"
        actionText="Ver Contenido"
        to="/biblioteca/tecnologias-emergentes"
      />
      <Card
        type="white"
        icon={<img src={aureSvg} alt="Automatización de Redes" />}
        title="Automatización de Redes"
        actionText="Ver Contenido"
        to="/biblioteca/automatizacion-de-redes"
      />
      <Card
        type="blue"
        icon={<img src={alproSvg} alt="Algoritmos y Programación" />}
        title="Algoritmos y Programación"
        actionText="Ver Contenido"
        to="/biblioteca/algoritmos-y-programacion"
      />
      <Card
        type="white"
        icon={<img src={arcoSvg} alt="Arquitectura del Computador" />}
        title="Arquitectura del Computador"
        actionText="Ver Contenido"
        to="/biblioteca/arquitectura-del-computador"
      />
    </div>
  </main>
);

export default Biblioteca;


