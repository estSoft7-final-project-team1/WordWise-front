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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password" element={<FindPassword />} />
          <Route path="/word" element={<WordMain />} />
          <Route path="/wordbook" element={<WordBook/>} />
          <Route path="/wordbook/:id" element={<WordBookDetail/>} />
          <Route path="/wordbook/ranking" element={<WordBookRanking/>} />
          <Route path="/wordtest" element={<WordTest />} />
          <Route path="/wordtest/statistics" element={<StatisticsPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/adimin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
