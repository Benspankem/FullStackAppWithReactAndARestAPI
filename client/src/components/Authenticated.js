import React from 'react';
import { Link } from 'react-router-dom';

// Display an authentication message when first logging in 
export default ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>Welcome {authUser.firstName}, you are authenticated!</h1>
      <Link className='button' to={`/courses/`}>View Courses</Link>
    </div>
  </div>
  );
}