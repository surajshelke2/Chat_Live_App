import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatPage from './pages/chatPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
