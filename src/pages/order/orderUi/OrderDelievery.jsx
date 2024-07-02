import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderDeliverySteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Order has been created" },
    { number: 2, label: "Payment Received" },
    { number: 3, label: "Transporting to [1]" },
    { number: 4, label: "Delivery successful" },
  ];

  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle>Delivery Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                    index + 1 === currentStep ? "bg-blue-400" : ""
                  } ${index + 1 <= currentStep ? "border-blue-400" : ""}`}
                >
                  {index + 1 <= currentStep ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div
                  className={`mt-2 text-sm text-center ${
                    index + 1 === currentStep ? "text-blue-400" : ""
                  }`}
                >
                  {step.label}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div>
                  <Separator />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDeliverySteps;
