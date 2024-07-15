import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/App.css';

// Find the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container!); // Use non-null assertion operator since 'root' is not null

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
