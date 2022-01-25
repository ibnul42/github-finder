import React from 'react';
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='hero'>
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-7xl font-bold mb-5">Opps!</h1>
          <p className='text-4xl mb-5'>Page not Found</p>
          <Link to='/' className='btn btn-primary'>
            <FaHome className='mr-2' />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
