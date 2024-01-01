import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatPage from './pages/chatPage';
import React from 'react';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes >
        
        <Route path="/" element={<div className='App'><Home /></div>} />
        <Route path="/chats" element={<div className='App'><ChatPage /></div>} />
        
      </Routes>
    </Router>
  );
}

export default App;
