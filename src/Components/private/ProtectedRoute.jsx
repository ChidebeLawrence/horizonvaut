// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const isTokenExpired = (token) => {
//     if (!token) return true;
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decodedToken.exp < currentTime; // Check if the token is expired
// };

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('authToken');

//     if (!token || isTokenExpired(token)) {
//         // If no token or token is expired, redirect to login
//         return <Navigate to="/signin" replace />;
//     }

//     return children; // If authenticated, allow access to the route
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // No token, redirect to sign-in
        return <Navigate to="/signin" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
            // Token is expired, redirect to sign-in
            return <Navigate to="/signin" replace />;
        }
    } catch (error) {
        // If there's an error decoding the token, redirect to sign-in
        return <Navigate to="/signin" replace />;
    }

    // Token is valid, render the children (protected component)
    return children;
};

export default ProtectedRoute;
