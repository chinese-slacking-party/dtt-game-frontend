// CongratsPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const CongratsPage = () => {
  return (
    <div>
      <h2>Congratulations! You have completed all levels!</h2>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default CongratsPage;
