import MultipleRadialBarChart from '@/components/coustomUi/DoughNut';
import { Card } from '@/components/ui/card';
import React from 'react';

const ProductChart = ({ product }) => {
  const data = product.data.slice(0, 3); // Send only the first 3 data items

  console.log(data); // Ensure the data is filtered correctly

  return (
    <Card className='col-span-2 bg-primary-foreground'>
      <MultipleRadialBarChart data={data} />    
    </Card>
  );
};

export default ProductChart;
