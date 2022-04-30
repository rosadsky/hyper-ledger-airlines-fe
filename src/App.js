import './App.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navbar';
import EconFly from './components/econfly';
import BusiFly from './components/busyfly';
import GladlyAbroad from './components/gladlyabroad';
import Client from './components/client';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/econfly" element={<EconFly />} />
        <Route exact path="/busifly" element={<BusiFly />} />
        <Route exact path="/gladlyabroad" element={<GladlyAbroad />} />
        <Route exact path="/client" element={<Client />} />
    </Routes>  
    </div>
  );
}

export default App;
