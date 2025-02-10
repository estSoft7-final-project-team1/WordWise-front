import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordTest from './components/WordTest';
import WordMain from './components/WordMain';
import StatisticsPage from './components/StatisticsPage';
import Chat from './components/Chat';
import Admin from './components/Admin'
import Index from './components/Index'
import Login from './components/Login'
import FindPassword from './components/FindPassword'
import Signup from './components/Signup'
import WordBook from './components/WordBook'
import WordBookRanking from './components/WordBookRanking'
import WordBookDetail from "./components/WordBookDetail";
import Layout from './components/Layout';
import LoginAuthorization from './utils/LoginAuthorization';
// import DashBoard from './components/wordwise-dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/signup" element={<Signup />} />
          <Route path="/api/password" element={<FindPassword />} />
          <Route path="/api/word" element={<WordMain />} />
          <Route path="/api/wordbook" element={<WordBook/>} />
          <Route path="/api/wordbook/:id" element={<WordBookDetail/>} />
          <Route path="/api/wordbook/ranking" element={<WordBookRanking/>} />
          <Route path="/api/wordtest" element={<WordTest />} />
          <Route path="/api/wordtest/statistics" element={<StatisticsPage />} />
          <Route path="/api/chat" element={<Chat />} />
          <Route path="/api/adimin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
