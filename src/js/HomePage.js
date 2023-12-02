import React from 'react';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';
import matchmelogo from '../pics/matchmelogo.svg';


function HomePage() {
    return (
        <div className="App">
          <header>
            <img src={matchmelogo} alt="Logo" className="home-logo" />
            <p className="home_reminder"> Here, we combine play with purpose, creating a nurturing environment where fun and learning go hand in hand to foster cognitive development and memorization, all within a safe and engaging virtual playground. Join our community and embark on a journey where every challenge is an opportunity for growth and every success is celebrated!
</p>    
            
          </header>
        <Link to="/Upload">
          <button className="getstarted-button">Get Started</button>
        </Link>
        </div>
      );
}

export default HomePage;