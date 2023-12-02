import React from 'react';
import '../css/UploadPage.css';
import { Link } from 'react-router-dom';
import matchmelogo from '../pics/matchmelogo.svg';

function UploadPage() {
    return (
        <div className="App">
          <header>
          <img src={matchmelogo} alt="Logo" className="upload-logo" />
            <p className="upload_reminder">Make your game experience uniquely yours 👨‍👩‍👧‍👦 Help your little one upload 3 photos of your family members to make the adventure even more personal! </p> 
          </header>
          <div className="photo-upload-container">
            {[1, 2, 3].map((item) => (
              <div key={item} className="photo-upload">
                <input type="file" />
              </div>
            ))}
          </div>
          <Link to="/ImageGame">
          <button className="continue-button">Continue</button>
          </Link>
        </div>
      );
}

export default UploadPage;