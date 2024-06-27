import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const QuantitySelector = ({ available, quantity, setQuantity }) => {
  const handleIncrease = () => {
    if (quantity < available) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center rounded-md">
        <Button
          variant="outline"
          onClick={handleDecrease}
          className="px-3 py-1 border-r focus:outline-none"
        >
          -
        </Button>
        <Input
          type="text"
          readOnly
          value={quantity}
          className="w-12 text-center focus:outline-none"
        />
        <Button
          variant="outline"
          onClick={handleIncrease}
          className="px-3 py-1 border-l focus:outline-none"
        >
          +
        </Button>
      </div>
      <div className=" text-gray-500 text-xs">Available: {available}</div>
    </div>
  );
};

export default QuantitySelector;
