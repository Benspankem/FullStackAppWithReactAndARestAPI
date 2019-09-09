import React from 'react';
import { Link } from 'react-router-dom';

// Display the header onto the page
export default class Header extends React.PureComponent {
    render() {
        const authUser = this.props.context.authenticatedUser;
        return(
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                    {/* Wehn signed in, a welcome message and a signout button should appear */}
                        { authUser ? (
                            <React.Fragment>
                            <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                            <Link to="/signout">Sign Out</Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>                        
                                <Link className="signup" to="/signup">Sign Up</Link>
                                <Link className="signin" to="/signin">Sign In</Link>
                            </React.Fragment>
                            )}
                    </nav>
                </div>
            </div>
        )
    }
}