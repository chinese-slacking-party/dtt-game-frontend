import React, { useState } from 'react';
import axios from 'axios';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';
import matchmelogo from '../pics/matchmelogo.svg';

function HomePage() {
    const [name, setName] = useState('');
    const [isNameEntered, setIsNameEntered] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async () => {
        if (name.trim() === '') {
            alert("Please enter a name");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/session', { name });
            console.log(response.data); // 打印响应数据
            setIsNameEntered(true); // 允许跳转
        } catch (error) {
            console.error('Error posting session data:', error);
            alert("Internal error, please contact admin");
        }
    };

    return (
        <div className="App">
            <header>
                <img src={matchmelogo} alt="Logo" className="home-logo" />
                <p className="home_reminder"> Here, we combine play with purpose, creating a nurturing environment where fun and learning go hand in hand to foster cognitive development and memorization, all within a safe and engaging virtual playground. Join our community and embark on a journey where every challenge is an opportunity for growth and every success is celebrated! </p>    
            </header>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="name-input"
            />
            {isNameEntered ? (
                <Link to="/Upload">
                    <button className="getstarted-button">Get Started</button>
                </Link>
            ) : (
                <button onClick={handleSubmit} className="getstarted-button">Get Started</button>
            )}
        </div>
    );
}

export default HomePage;
