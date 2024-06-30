import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddNewCard = ({ addCard }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = { cardNumber, cardHolder, expirationDate, cvv };
    addCard(newCard);
    setCardNumber("");
    setCardHolder("");
    setExpirationDate("");
    setCvv("");
  };

  return (
    <Dialog>
      <DialogTrigger>+ Add New Card</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add New Card</DialogTitle>
        <form onSubmit={handleAddCard} className="space-y-4 mt-4">
          <div>
            <label htmlFor="card-number" className="block text-sm">
              Card number
            </label>
            <Input
              type="text"
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full"
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>
          <div>
            <label htmlFor="card-holder" className="block text-sm">
              Card holder
            </label>
            <Input
              type="text"
              id="card-holder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="mt-1 block w-full"
              placeholder="JOHN DOE"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="expiration-date" className="block text-sm">
                Expiration date
              </label>
              <Input
                type="text"
                id="expiration-date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="mt-1 block w-full"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm">
                CVV/CVC
              </label>
              <Input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 block w-full"
                placeholder="***"
                required
              />
            </div>
          </div>
          <p className="text-xs mt-1">
            Your transaction is secured with SSL encryption
          </p>
          <div className="flex justify-end space-x-4">
            <DialogClose>
              <Button
                variant="outline"
                type="button"
                className="py-2 px-4 rounded-md"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="py-2 px-4 rounded-md">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCard;
