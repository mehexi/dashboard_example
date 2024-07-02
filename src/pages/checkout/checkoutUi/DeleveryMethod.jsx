import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Rabbit, TrainFront } from "lucide-react";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const DeliveryMethod = ({setShippingConst}) => {
  const deliveryOptions = [
    {
      label: "Free",
      cost: 0,
      time: "5-7 days delivery",
      icon: <Accessibility size={32} />,
    },
    {
      label: "Standard",
      cost: 10,
      time: "3-5 days delivery",
      icon: <Rabbit size={32} />,
    },
    {
      label: "Express",
      cost: 20,
      time: "2-3 days delivery",
      icon: <TrainFront size={32} />,
    },
  ];
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);


  const handleDeliveryChange = (option) => {
      setSelectedDelivery(option);
      console.log('deliverycost', option)
      setShippingConst(option)
  };

  return (
      <Card className="bg-primary-foreground">
        <CardHeader>
          <CardTitle>
            <h1>Delivery</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2  gap-4">
            {deliveryOptions.map((option) => (
              <Card
                key={option.label}
                className={`cursor-pointer
                            ${
                              selectedDelivery.label === option.label
                                ? "border-blue-500"
                                : ""
                            }`}
                onClick={() => handleDeliveryChange(option)}
              >
                <CardContent className="pt-6 flex items-center">
                  <div className="flex items-center gap-3 w-full align-middle">
                    {option.icon}
                    <div>
                      <div className="text-lg">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.time}
                      </div>
                    </div>
                  </div>
                  <span className="text-right font-bold text-2xl">
                    ${option.cost}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
  );
};

export default DeliveryMethod;
