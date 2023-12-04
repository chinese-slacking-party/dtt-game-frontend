import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/UploadPage.css';
import matchmelogo from '../pics/matchmelogo.svg';

function UploadPage() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    if (event.target.files[0]) { // Check if file is selected
      newFiles[index] = event.target.files[0];
      setFiles(newFiles);
    }
  };

  const handleContinue = async () => {
    console.log(files.length)
    if (files.length < 3) {
      alert("Please upload 3 photos to continue.");
      return;
    }

    try {
      await Promise.all(files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const url = `/api/v1/users/:name/files/${file.name}`; // TODO: replace :name with actual name
        await fetch(url, {
          method: 'POST',
          body: formData,
        });

        const albumData = {
          desc: "some description",
          filename: file.name
        };
        await fetch('/api/v1/album/new', {
          method: 'POST',
          body: JSON.stringify(albumData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }));

      navigate("/ImageGame"); // Navigate after uploads are complete
    } catch (error) {
      console.error("Upload error:", error);
      // Handle errors here
    }
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
      <button className="continue-button" onClick={handleContinue} >Continue</button>
    </div>
  );
}

export default UploadPage;
