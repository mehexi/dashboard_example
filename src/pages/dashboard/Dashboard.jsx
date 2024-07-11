import { AuthContext } from '@/auth/AuthProvider';
import React, { useContext } from 'react';
import GreetingsCard from './dashboardUi/GreetingsCard';
import DasProduct from './dashboardUi/DasProduct';

const Dashboard = () => {

    const {user} = useContext(AuthContext)
    console.log(user)

    return (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-4'>
            <GreetingsCard />
            <DasProduct/>
      </section>
    );
};

export default Dashboard;