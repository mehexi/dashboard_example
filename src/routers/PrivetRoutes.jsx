import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoutes = ({children}) => {
    const token = localStorage.getItem('token')
    const location = useLocation()
    
    if (token) {
        return children
    }

    return <Navigate to={'/login'} state={{form: location}} replace />
};

export default PrivetRoutes;