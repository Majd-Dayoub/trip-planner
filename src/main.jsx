import React from 'react'; // Core React library
import { createRoot } from 'react-dom/client'; // React DOM rendering

import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'; // Third-party library imports

// Main application component
import App from './App.jsx'; 

// Page components
import CreateTrip from './pages/create-trip/index.jsx'; 

// Custom components
import Navbar from './components/custom/Navbar.jsx'; 

// Global styles
import './index.css'; 


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  }


]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router}/>
  </React.StrictMode>
)
