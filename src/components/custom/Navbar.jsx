import React from 'react'
import {Button} from '../ui/button'

function Navbar() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img className="w-16 h-auto" src="/plane-logo.svg"/>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Navbar