import { AuthContext } from '@/auth/AuthProvider';
import React, { useContext } from 'react';

const Dashboard = () => {

    const {user} = useContext(AuthContext)
    console.log(user)

    return (
        <div>
            
        </div>
    );
};

export default Dashboard;