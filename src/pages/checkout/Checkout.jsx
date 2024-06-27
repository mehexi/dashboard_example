import { useLoaderData } from "react-router-dom";
import CartItems from "./checkoutUi/CartItems";
import Summary from "./checkoutUi/Summary";
import React, { useState } from 'react';

const Checkout = () => {
  const data = useLoaderData();
  const [cartData, setCartData] = useState(data);

  const handleCartUpdate = (updatedCartData) => {
    setCartData(updatedCartData);
  };

  console.log(cartData);

  return (
    <section className="mx-auto w-full max-w-[80rem] p-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="mx-auto w-full max-w-[80rem] grid grid-cols-7 mt-8 gap-4">
        <CartItems data={cartData} onCartUpdate={handleCartUpdate} />
        <Summary cartData={cartData} />
      </div>
    </section>
  );
};

export default Checkout;
