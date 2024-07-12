import MultipleRadialBarChart from '@/components/coustomUi/DoughNut';
import SalesChart from '@/components/coustomUi/DoughNut';
import React from 'react';

const ProductChart = () => {

    const data = [
        { label: 'Mens', value: 80, color: '#8e44ad' },
        { label: 'Womens', value: 90, color: '#f39c12' },
        { label: 'Kids', value: 62, color: '#e74c3c' },
      ];

    return (
        <div>
          <MultipleRadialBarChart data={data} />    
        </div>
    );
};

export default ProductChart;