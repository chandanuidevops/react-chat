import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
