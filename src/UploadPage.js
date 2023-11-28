import React from 'react';
import './UploadPage.css';
// import { Link } from 'react-router-dom';
import matchmelogo from './matchmelogo.svg';

function UploadPage() {
    return (
        <div className="App">
          <header>
            <img src={matchmelogo} alt="Logo" className="logo" />
            <p className="reminder">Make your game experience uniquely yours 👨‍👩‍👧‍👦  </p> 
            <p className="reminder"> Help your little one upload 3 photos of your family members to make the adventure even more personal and exciting!</p>
          </header>
          <div className="photo-upload-container">
            {[1, 2, 3].map((item) => (
              <div key={item} className="photo-upload">
                <input type="file" />
              </div>
            ))}
          </div>
          <button className="continue-button">Continue</button>
        </div>
      );
}

export default UploadPage;