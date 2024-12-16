// SuccessPage.js
import React, { useEffect, useState } from 'react';
import './LobbyView.css';
import axios from 'axios';

const SuccessPage = () => {
    const [imageUrl, setImageUrl] = useState(''); // To store the image URL
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null);
    const [cityName, setCityName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    // Handle input changes for city name
    const handleInputChange = (event) => {
        setCityName(event.target.value);
    };

    // Handle submission of city name
    const handleCitySubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/verify-city',
                { code: cityName },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setResponseMessage(response.data); // Set response message
        } catch (error) {
            console.error('Error submitting city name:', error);
            setResponseMessage('Failed to verify city name.');
        }
    };

    // Fetch the image on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/api/image')
            .then((response) => {
                console.log(response.data); // Log the response
                if (response.data) {
                    setImageUrl(response.data); // Directly set the plain URL
                } else {
                    setError('Image URL not found in response.');
                }

            })
            .catch((err) => {
                setError('Failed to fetch image data.');
                console.error('Error fetching image:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    return (
        <div className="LobbyView">
            <h1>Welcome to the Lobby!</h1>
            <p>Your game code was verified successfully.</p>

            {error && <p style={{color: 'red'}}>{error}</p>} {/* Display error messages */}
            {imageUrl ? (
                <div>
                    <h2>City Image:</h2>

                    <img src={imageUrl} alt="City" className="cityImage"/>
                </div>
            ) : (
                <p>No image available.</p>
            )}
            <div className="input-container">
                <label>
                    City name
                    <input
                        type="text"
                        value={cityName}
                        onChange={handleInputChange}
                        placeholder="Enter your city name"
                    />
                </label>
                <button type="button" className="button" onClick={handleCitySubmit}>
                    Submit City Name
                </button>
            </div>

            {responseMessage && <p className="response-message">{responseMessage}</p>} {/* Display response messages */}
        </div>
    );
};

export default SuccessPage;
