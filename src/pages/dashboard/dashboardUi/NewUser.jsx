import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const NewUser = ({allUser}) => {
    return (
        <Card className="col-span-1 md:col-span-2 h-40 bg-primary-foreground flex justify-between items-center">
            <CardHeader className="col-span-1 flex gap-1">
        <CardDescription>Total User</CardDescription>
        <CardTitle className="text-3xl">
                    <span>{allUser.totalUsers}</span>
        </CardTitle>
            </CardHeader>
            <CardContent className='p-6 flex items-center gap-3'>
                <div className='flex flex-col items-end'>
                    <span className='px-2 py-1 border rounded-full text-xs text-green-500 border-green-500'>newset user</span>
                    <h1 className='text-2xl'>{allUser.data[0].name}</h1>
                </div>
                <div className='w-20 h-20 border rounded-lg overflow-hidden '>
                    <img src={allUser.data[0].photoURL} alt="" />
                </div>
            </CardContent>
       </Card>
    );
};

export default NewUser;