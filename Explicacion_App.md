# Explicación Detallada de `App.jsx`

El archivo `App.jsx` es el componente raíz de la aplicación educativa. Se encarga de definir la estructura principal (encabezado, pie de página y área de contenido) y gestionar la navegación entre las diferentes pantallas utilizando React Router.

A continuación, se desglosa y explica cada parte del código:

## 1. Importaciones (Imports)
```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Laptop } from 'lucide-react';
import logoUnefa from './assets/logo_unefa.jpg';
```
- **`React`**: La librería base para crear componentes.
- **`react-router-dom`**: Proporciona las herramientas para la navegación y el enrutamiento. 
  - `BrowserRouter`, `Routes`, `Route`: Para definir las rutas de la app.
  - `useNavigate`: Un "hook" (función) que permite cambiar de ruta mediante código (por ejemplo, al hacer clic en un botón).
  - `useLocation`: Un hook para obtener la ruta actual (URL) en la que se encuentra el usuario.
- **`lucide-react`**: Librería de iconos. Se está importando el icono `Laptop`.
- **`logoUnefa`**: Importa la imagen del logo desde la carpeta local de assets.

## 2. Componente `Header` (Encabezado)
Este componente representa la barra superior de la aplicación.
- **Navegación Inteligente**: Utiliza `useLocation()` para saber si el usuario está en la página principal (`/`). Si no está en la página principal (`!isHome`), muestra un botón de **ATRÁS** que lo regresa a la página anterior (`navigate(-1)`).
- **Botón Salir**: Siempre muestra un botón de **SALIR** que redirige a la pantalla de inicio (`navigate('/')`).
- **Diseño**: Muestra el título de la escuela: "E. T. 'PEDRO ARISMENDI BRITO' - ÁREA DE TELEMÁTICA".

## 3. Componente `Footer` (Pie de Página)
Representa la barra inferior y contiene un modal (ventana emergente) oculto.
- **Estado (State)**: Usa `React.useState(false)` para controlar la variable `showModal`. Si es `true`, el modal se muestra; si es `false`, se oculta.
- **Texto de Créditos**: Hay un texto "Elaborado por ..." que al hacer clic cambia el estado a `true` (`setShowModal(true)`), abriendo el modal.
- **Logo**: Muestra el logo de la UNEFA importado anteriormente.
- **Modal de Creadores**: Cuando `showModal` es verdadero, se dibuja en pantalla una capa superpuesta (`modal-overlay`) con la lista de desarrolladores y diseñadores. Tiene un botón para "Cerrar" que vuelve a poner el estado en `false`.

## 4. Componente `Card` (Tarjeta)
Es un componente reutilizable, lo que significa que se usa varias veces para crear los diferentes botones/tarjetas del menú principal y de las sub-secciones.
- **Propiedades (Props)**: Recibe parámetros para personalizarse:
  - `type`: Determina el color o estilo de la tarjeta (ej. "blue" o "white").
  - `title`: El título principal de la tarjeta.
  - `actionText`: El texto del botón inferior (ej. "Iniciar", "Jugar").
  - `to`: La ruta a la que debe navegar al hacer clic.
  - `icon` y `number`: Opcionalmente muestra un icono o un número grande en el centro superior.
- **Interacción**: Al hacer clic en cualquier parte de la tarjeta o en su botón interno, utiliza `navigate(to)` para llevar al usuario a la ruta indicada.

## 5. Vistas o Páginas
Se definen tres componentes que representan las pantallas completas de la aplicación:

### `Inicio`
- Es la pantalla principal de bienvenida.
- Muestra un título de "Bienvenido".
- Usa una cuadrícula de dos columnas (`cols-2`) para mostrar dos tarjetas grandes: "Minijuegos" y "Biblioteca", que redirigen a `/minijuegos` y `/biblioteca` respectivamente.

### `Minijuegos`
- Es la pantalla de la sección de minijuegos.
- Muestra el título "Minijuegos".
- Usa una cuadrícula de dos columnas (`cols-2`) para mostrar dos tarjetas: "Quiz" y "Memorias". Actualmente, los enlaces de estas tarjetas apuntan a `#` (están pendientes por definir).

### `Biblioteca`
- Es la pantalla de la sección de la biblioteca.
- Muestra el título "Biblioteca".
- Utiliza una cuadrícula de tres columnas (`cols-3`) para mostrar 6 tarjetas en total.
- 5 tarjetas están numeradas del 1 al 5 representando los años de estudio ("1er Año" a "5to Año").
- La sexta tarjeta representa el área "Técnico" y utiliza el icono importado `<Laptop />`.
- Al igual que en minijuegos, sus enlaces apuntan a `#` por ahora.

## 6. Componente Principal `App`
Es el núcleo que une todas las piezas explicadas anteriormente.
- **`<BrowserRouter>`**: Envuelve la aplicación para habilitar el sistema de rutas de React.
- **Estructura Visual**: Coloca el `<Header />` fijo en la parte superior, el `<Footer />` fijo en la parte inferior y, en el medio, define el contenedor de rutas `<Routes>`.
- **`<Routes>` y `<Route>`**: Establece las reglas de navegación que determinan qué se muestra en la pantalla intermedia:
  - Si la ruta de la URL es `/`, carga el componente `<Inicio />`.
  - Si la ruta de la URL es `/minijuegos`, carga el componente `<Minijuegos />`.
  - Si la ruta de la URL es `/biblioteca`, carga el componente `<Biblioteca />`.
- Finalmente, se exporta este componente (`export default App`) para que el punto de entrada de la aplicación en React lo pueda inyectar y renderizar en el navegador.
