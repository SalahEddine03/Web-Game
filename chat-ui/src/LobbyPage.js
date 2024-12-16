import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LobbyPage.css';

const LobbyPage = () => {
    const [gameCode, setGameCode] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateLobby = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/create-lobby');
            const lobbyCode = response.data;
            navigate(`/lobby/${lobbyCode}`);
        } catch (error) {
            setResponseMessage('Failed to create lobby.');
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/verify-lobby',
                { code: gameCode },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data === 'Correct code!') {
                navigate(`/lobby/${gameCode}`);
            } else {
                setResponseMessage(response.data);
            }
        } catch (error) {
            setResponseMessage('Failed to verify game code.');
        }
    };

    return (
        <div className="LobbyPage">
            <h1>Game Lobby</h1>
            <button onClick={handleCreateLobby}>Create Lobby</button>
            <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Enter Game Code"
            />
            <button onClick={handleSubmit}>Join Lobby</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default LobbyPage;
