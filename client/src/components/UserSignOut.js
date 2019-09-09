import React from 'react';
import { Redirect } from 'react-router-dom';

// Redirect to homepage when the signout button is clicked
export default ({ context }) => {
    context.actions.signOut();

    return (
        <Redirect to="/" />
    );
}