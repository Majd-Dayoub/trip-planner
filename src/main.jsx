import React from 'react'; // Core React library
import { createRoot } from 'react-dom/client'; // React DOM rendering
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Correct imports from react-router-dom

// Main application component
import App from './App.jsx';

// Page components
import CreateTrip from './pages/create-trip/index.jsx';

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
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
