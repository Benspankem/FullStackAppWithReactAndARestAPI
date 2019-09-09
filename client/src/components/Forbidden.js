import React from 'react';
import { Link } from 'react-router-dom';

// display a forbidden page if the user is not authorized
export default () => (
    <div className="bounds">
        <h1>Forbidden</h1>
        <p>You are not authorized to make changes to this course.</p>
        <Link to="/" className="button button-secondary">Return to Courses</Link>
        </div>
    )

