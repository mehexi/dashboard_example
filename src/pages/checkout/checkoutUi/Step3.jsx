import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Step3 = () => {
  const { cartData, handleCartUpdate } = useOutletContext();

  return (
    <div>
      <h2>Step 3</h2>
      {/* Your step 3 content here */}
    </div>
  );
};

export default Step3;
