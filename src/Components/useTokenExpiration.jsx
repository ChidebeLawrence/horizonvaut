import { useEffect } from 'react';

const useTokenExpiration = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Assuming token is a JWT, decode it to get expiration time
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        // Clear the token if it has expired
        localStorage.removeItem('token');
      }
    }
  }, []);
};

export default useTokenExpiration;
