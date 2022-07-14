import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Producto from './app/productos/Producto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Producto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
