import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
