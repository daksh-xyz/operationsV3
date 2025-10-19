import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  // optional list of roles allowed to view this route. If omitted, any authenticated user may view.
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, ensure the current user's role is allowed
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role || "";
    if (!allowedRoles.includes(userRole)) {
      // Redirect unauthorized users to dashboard (or show a 403 page if you prefer)
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

