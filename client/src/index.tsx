import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';


// Ensure that `root` element exists and is properly typed.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Casting to HTMLElement to avoid TypeScript errors
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pass a function to handle the performance metrics
reportWebVitals(console.log);  // Log the performance metrics to the console
