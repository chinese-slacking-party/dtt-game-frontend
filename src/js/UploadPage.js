import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/UploadPage.css';
import matchmelogo from '../pics/matchmelogo.svg';
import axios from 'axios'; // 导入 axios


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
        const url = `/api/v1/users/files/${file.name}`; // TODO: replace :name with actual name

        // 使用 axios 替换 fetch
        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const albumData = {
          desc: "some description",
          filename: file.name
        };

        await axios.post('/api/v1/album/new', albumData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }));

      navigate("/ImageGame"); // Navigate after uploads are complete
    } catch (error) {
      console.error("Upload error:", error);
      alert("Please contact your admin");
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
