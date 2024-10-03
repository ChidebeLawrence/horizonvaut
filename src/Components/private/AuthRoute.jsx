// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthRoute = ({ children }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
        
//         if (token) {
//             navigate('/profile/wallet');
//         }
//     }, [navigate]);

//     return children;
// };

// export default AuthRoute;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            // If the user is already logged in, redirect to wallet
            navigate('/profile/wallet');
        }
    }, [navigate]);

    return children;
};

export default AuthRoute;
