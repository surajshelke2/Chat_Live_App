import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ChatPage from './Pages/ChatPage';
import './App.css'
import Home from './Pages/Home';

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
