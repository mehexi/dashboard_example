import React from 'react';

const LineChartTool = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        console.log(label)
        return (
            <div className='bg-primary-foreground rounded-xl flex flex-col text-center min-w-[80px] overflow-hidden shadow-md'>
                <div className='px-4 py-2 bg-slate-800'>{label}</div>
                <div className='px-4 py-2 bg-slate-700'>{payload[0].value}</div>
            </div>
        );
    }
}

export default LineChartTool;