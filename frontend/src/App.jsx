import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatPage from './Pages/ChatPage';
import './App.css'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
