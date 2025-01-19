// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Example, change this according to your setup
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Add this at the end to fix the error
export {};
