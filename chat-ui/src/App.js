import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './LobbyPage';
import LobbyView from './LobbyView';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LobbyPage />} />
                <Route path="/lobby/:code" element={<LobbyView />} />
            </Routes>
        </Router>
    );
};

export default App;
