import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Use Vite env variables
const basename = import.meta.env.VITE_BASE_PATH || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);














// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";

// // Detect production (Vercel) vs local
// const basename = import.meta.env.PROD ? "/events_planner" : "/";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter basename={basename}>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
