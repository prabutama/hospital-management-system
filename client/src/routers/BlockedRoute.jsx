import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const BlockedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    let route = ''
    if (user?.role === "doctor")
        route = "/doctor/dashboard"
    if (user?.role === "patient")
        route = "/patient/dashboard/doctors"

    return isAuthenticated ? <Navigate to={route} /> : children;
};

export default BlockedRoute;