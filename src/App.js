import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './js/HomePage';
import UploadPage from './js/UploadPage';
import ImageGame from './js/ImageGame';
import CongratsPage from './js/CongratsPage';
import axios from 'axios';
axios.defaults.withCredentials = true;

function MatchMe() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/imageGame" element={<ImageGame />} />
        <Route path="/congrats" component={<CongratsPage />} />
      </Routes>
    </Router>
  );
}

export default MatchMe;
