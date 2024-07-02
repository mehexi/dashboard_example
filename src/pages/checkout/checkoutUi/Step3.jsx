import React from "react";
import DeliveryMethod from "./DeleveryMethod";
import { useOutletContext } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";

const Step3 = () => {

  const { cartData, handleCartUpdate,setShippingConst,setPaymentOption } = useOutletContext();

  return <section className="flex flex-col gap-6">
    <DeliveryMethod setShippingConst={setShippingConst} />
    <PaymentMethod setPaymentOption={setPaymentOption} />
  </section>;
};

export default Step3;
