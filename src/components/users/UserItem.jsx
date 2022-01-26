import React from 'react';
import { Link } from 'react-router-dom';

function UserItem({user: {login, avatar_url}}) {
  return <div className='card shadow-lg compact side bg-base-100'>
      <div className="flex-row item-center space-x-5 card-body">
          <div>
              <div className="avatar">
                  <div className="rounded-full shadow w-16 h-16">
                      <img src={avatar_url} alt="Profile" />
                  </div>
              </div>
          </div>
          <div>
              <h2 className="card-title">
                  {login}
              </h2>
              <Link className='text-base-content text-opacity-40' to={`/users/${login}`} >
                  Visit Profile
              </Link>
          </div>
      </div>

  </div>;
}

export default UserItem;
