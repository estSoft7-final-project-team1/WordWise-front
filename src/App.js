import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordTest from './components/WordTest';
import StatisticsPage from './components/StatisticsPage';
import Chat from './components/Chat';
import Admin from './components/wordwise-admin'
import Index from './components/wordwise-index'
// import DashBoard from './components/wordwise-dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/wordtest/start" element={<WordTest/>} />
        <Route path="/api/wordtest/statistics" element={<StatisticsPage/>} />
        <Route path="/api/chat" element={<Chat/>} />
        <Route path="/api/1" element={<Admin/>} />
        <Route path="/api/2" element={<Index/>} />

        {/* <Route path="/api/3" element={<DashBoard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
