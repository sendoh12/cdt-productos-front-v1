import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Pelicula from './app/peliculas/Pelicula';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pelicula />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
