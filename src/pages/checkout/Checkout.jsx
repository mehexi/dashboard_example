// src/pages/checkout/Checkout.jsx

import { useLoaderData, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CartItems from "./checkoutUi/CartItems";
import Summary from "./checkoutUi/Summary";

const Checkout = () => {
  const data = useLoaderData();
  const [cartData, setCartData] = useState(data);
  const [location, setLocation] = useState(null);
  const [shippingCost,setShippingConst] = useState(0)
  
  const navigate = useNavigate();
  const windowLocation = useLocation();

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = JSON.parse(localStorage.getItem("location"));
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem("location", JSON.stringify(location));
    }
  }, [location]);

  const handleCartUpdate = (updatedCartData) => {
    setCartData(updatedCartData);
  };

  const isStep2 = windowLocation.pathname.includes("step2");
  const isStep3 = windowLocation.pathname.includes("step3");

  return (
    <section className="mx-auto w-full max-w-[80rem] p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="mx-auto w-full max-w-[80rem] grid grid-cols-1 lg:grid-cols-7 mt-8 gap-4">
        <div className="col-span-1 lg:col-span-5">
          {!isStep2 && !isStep3 && (
            <>
              <CartItems data={cartData} onCartUpdate={handleCartUpdate} />
              <div className="mt-5">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <ChevronLeft /> Continue Shopping
                </Button>
              </div>
            </>
          )}
          <Outlet context={{ cartData, handleCartUpdate, location, setLocation,setShippingConst}} />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <Summary cartData={cartData} userLocation={location} shippingCost={shippingCost} />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
