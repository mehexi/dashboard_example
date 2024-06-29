import React from "react";
import DeliveryMethod from "./DeleveryMethod";
import { useOutletContext } from "react-router-dom";

const Step3 = () => {

  const { cartData, handleCartUpdate,setShippingConst } = useOutletContext();

  return <section className="flex flex-col gap-6">
    <DeliveryMethod setShippingConst={setShippingConst} />
  </section>;
};

export default Step3;
