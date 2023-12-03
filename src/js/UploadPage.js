import React, { useState } from 'react';
import '../css/UploadPage.css';
import { Link } from 'react-router-dom';
import matchmelogo from '../pics/matchmelogo.svg';

function UploadPage() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleContinue = () => {
    files.forEach((file, index) => {
      const formData = new FormData();
      formData.append('file', file);
      const url = `/api/v1/users/:name/files/${file.name}`;
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          const albumData = {
            desc: "some description",
            filename: file.name
          };
          fetch('/api/v1/album/new', {
            method: 'POST',
            body: JSON.stringify(albumData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(albumResponse => {
              // Handle album response
            })
            .catch(albumError => {
              // Handle album error
            });
        })
        .catch(error => {
          // Handle upload error
        });
    });
  };

  return (
    <div className="App">
      <header>
        <img src={matchmelogo} alt="Logo" className="upload-logo" />
        <p className="upload_reminder">
          Make your game experience uniquely yours 👨‍👩‍👧‍👦 Help your little one upload 3 photos of your family members to make the adventure even more personal!
        </p>
      </header>
      <div className="photo-upload-container">
        {[1, 2, 3].map((item) => (
          <div key={item} className="photo-upload">
            <input type="file" onChange={(event) => handleFileChange(event, item - 1)} />
          </div>
        ))}
      </div>
      <Link to="/ImageGame">
        <button className="continue-button" onClick={handleContinue}>Continue</button>
      </Link>
    </div>
  );
}

export default UploadPage;
