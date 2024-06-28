import { useLoaderData, useNavigate } from "react-router-dom";
import CartItems from "./checkoutUi/CartItems";
import Summary from "./checkoutUi/Summary";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Checkout = () => {
  const data = useLoaderData();
  const [cartData, setCartData] = useState(data);

  useEffect(() => {}, []);

  const handleCartUpdate = (updatedCartData) => {
    setCartData(updatedCartData);
  };

  const navigate = useNavigate()

  return (
    <section className="mx-auto w-full max-w-[80rem] p-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="mx-auto w-full max-w-[80rem] grid grid-cols-7 mt-8 gap-4">
        <div className="col-span-5">
          <CartItems data={cartData} onCartUpdate={handleCartUpdate} />
          <div className='mt-5'><Button variant='ghost' onClick={()=>{navigate('/')}}> <ChevronLeft />  Continue Shopping</Button></div>
        </div>
        <Summary cartData={cartData} />
      </div>
    </section>
  );
};

export default Checkout;
