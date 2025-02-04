import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import WordTest from './components/WordTest';
// import StatisticsPage from './components/StatisticsPage';
// import Chat from './components/Chat';
import Index from './components/wordwise-index'
import Admin from './components/wordwise-admin'
import Dashboard from './components/admin-dashboard'
import Learning_Test from './components/admin-learning-test-statistics'
import Words_searched from './components/admin-statistics-of-words-searched'
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/api/wordtest/start" element={<WordTest />} />
        <Route path="/api/wordtest/statistics" element={<StatisticsPage />} />
        <Route path="/api/chat" element={<Chat />} /> */}
        <Route path="/api/home" element={<Index />} />
        <Route path="/api/admin-login" element={<Admin />} />
        <Route path="/api/admin-dashboard" element={<Dashboard />} />
        <Route path="/api/admin-learning_test" element={<Learning_Test />} />
        <Route path="/api/admin-statistics_of_words_searched" element={<Words_searched />} />
      </Routes>
    </Router>
  );
}

export default App;
