import React from 'react';
import { CardDescription } from '../ui/card';

const LineChartTool = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        console.log(label)
        return (
            <div className='bg-primary-foreground rounded-xl flex flex-col text-center min-w-[80px] overflow-hidden shadow-md'>
                <CardDescription className='px-4 py-2 bg-slate-800'>{label}</CardDescription>
                <div className='px-4 py-2 bg-slate-700 text-base'>{payload[0].value}</div>
            </div>
        );
    }
}

export default LineChartTool;