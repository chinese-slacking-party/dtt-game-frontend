import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './js/HomePage';
import UploadPage from './js/UploadPage';
import ImageGame from './js/ImageGame';


function MatchMe() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/imageGame" element={<ImageGame />} />
      </Routes>
    </Router>
  );
}

export default MatchMe;
