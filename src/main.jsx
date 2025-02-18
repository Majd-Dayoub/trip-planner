import React from 'react'; // Core React library
import { createRoot } from 'react-dom/client'; // React DOM rendering
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Correct imports from react-router-dom
import { GoogleOAuthProvider } from '@react-oauth/google';


// Main application component
import App from './App.jsx';

// Page components
import MyTrips from './pages/my-trips/index.jsx'

import CreateTrip from './pages/create-trip/index.jsx';

import ViewTrip from './pages/view-trip/[tripId]/index.jsx';

// Custom components
import Navbar from './components/custom/Navbar.jsx';

// Global styles
import './index.css';

// Layout component to include the Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

// Define routes with Layout
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <Layout>
        <CreateTrip />
      </Layout>
    ),
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <Layout>
        <ViewTrip />
      </Layout>
    ),
  },
  {
    path: '/my-trips',
    element: (
      <Layout>
        <MyTrips />
      </Layout>
    ),
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>
);
