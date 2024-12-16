import React, { useEffect, useState } from 'react';
import './SuccessPage.css';
import axios from 'axios';

const SuccessPage = () => {
    const [imageUrl, setImageUrl] = useState(''); // To store the image URL
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null);
    const [cityName, setCityName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleInputChange = (event) => {
        setCityName(event.target.value);
    };
    const handleCitySubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/verify-city',
                { code: cityName },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setResponseMessage(response.data);


        } catch (error) {
            console.error('Error :', error);
            setResponseMessage('Failed ');
        }
    };

    useEffect(() => {
        // Fetch the image URL from the backend API
        axios.get('http://localhost:8080/api/image')
            .then((response) => {
                if (response.data.imageUrl) {
                    setImageUrl(response.data.imageUrl); // Set the image URL if successful
                }
            })
            .catch((err) => {
                setError('Failed to load image'); // Handle errors
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the request completes
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="SuccessPage">
            <h1>Welcome to the Lobby!</h1>
            <p>Your game code was verified successfully.</p>

            {error && <p style={{color: 'red'}}>{error}</p>} {/* Show error if any */}

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
                        placeholder="Enter your city name "
                    />
                </label>
                <button type="button" className="button" onClick={handleCitySubmit}>
                    Submit City Name
                </button>
            </div>
            {responseMessage && <p className="response-message">{responseMessage}</p>}

        </div>
    );
};

export default SuccessPage;
