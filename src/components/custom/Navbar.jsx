import React from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '../ui/button';

function Navbar() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={'/'}>
        <img className="w-16 h-auto" src="/plane-logo.svg" alt="Logo" />
      </Link>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Navbar;
