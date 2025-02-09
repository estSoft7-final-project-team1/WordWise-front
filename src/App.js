import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordTest from './components/WordTest';
import WordMain from './components/WordMain';
import StatisticsPage from './components/StatisticsPage';
import Chat from './components/Chat';
import Admin from './components/wordwise-admin'
import Index from './components/wordwise-index'
import Login from './components/wordwise-login'
import FindPassword from './components/wordwise-finding-password'
import Signup from './components/wordwise-signup'
import Form from './components/Form'
import PersonalWordBook from './components/wordwise-mybook'
import WordBook from './components/wordwise-worldbook'
// import DashBoard from './components/wordwise-dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/wordtest" element={<WordTest />} />
        <Route path="/api/wordtest/statistics" element={<StatisticsPage />} />
        <Route path="/api/chat" element={<Chat />} />
        <Route path="/api/adim" element={<Admin />} />
        <Route path="/" element={<Index />} />
        <Route path="/api/word" element={<WordMain />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/password" element={<FindPassword />} />
        <Route path="/api/signup" element={<Signup />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/api/mywordbook" element={<PersonalWordBook/>} />
        <Route path="/api/wordbook" element={<WordBook/>} />
        {/* <Route path="/api/3" element={<DashBoard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
