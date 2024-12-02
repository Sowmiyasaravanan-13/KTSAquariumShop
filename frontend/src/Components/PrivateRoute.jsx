import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Assuming you have an AuthContext

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth(); // Assuming you have currentUser from AuthContext

  return currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
