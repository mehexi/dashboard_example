import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectOption } from "@/components/ui/select";
import AddNewCard from "./AddNewCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PaymentMethod = ({setPaymentOption}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cards, setCards] = useState([]);
  console.log(cards)

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setPaymentOption(method)
  };

  const addCard = (newCard) => {
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  };

  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card
          className={`cursor-pointer hover:border hover:border-blue-500 hover:shadow-md ${
            selectedMethod === "paypal"
              ? "border border-blue-500 shadow-md"
              : ""
          }`}
          onClick={() => handleSelectMethod("paypal")}
        >
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <CardTitle>Pay with PayPal</CardTitle>
              <CardDescription>
                You will be redirected to PayPal website to complete your
                purchase securely.
              </CardDescription>
            </div>
            <img
              src="/path/to/paypal-logo.png"
              alt="PayPal"
              className="w-8 h-8"
            />
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer  hover:border hover:border-blue-500 hover:shadow-md ${
            selectedMethod === "card" ? "border border-blue-500 shadow-md" : ""
          }`}
          onClick={() => handleSelectMethod("card")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Credit / Debit card</CardTitle>
                <CardDescription>
                  We support Mastercard, Visa, Discover, and Stripe.
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <img
                  src="/path/to/mastercard-logo.png"
                  alt="Mastercard"
                  className="w-8 h-8"
                />
                <img
                  src="/path/to/visa-logo.png"
                  alt="Visa"
                  className="w-8 h-8"
                />  
              </div>
            </div>
            {selectedMethod === "card" && (
              <div className="mt-4 py-4  border-t border-gray-700">
                <div className="mb-4 flex flex-col gap-3">
                  <Label
                    htmlFor="saved-cards"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Cards
                  </Label>
                  <Select
                    defaultValue={cards.length > 0 ? `${cards[0].cardNumber} - ${cards[0].cardHolder}` : ''}
                    className='bg-primary-foreground'
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a card" />
                    </SelectTrigger>
                    <SelectContent>
                      {cards.map((card, index) => (
                        <SelectItem key={index} value={`${card.cardNumber} - ${card.cardHolder}`}>
                          {`**** **** **** ${card.cardNumber.slice(-4)} - ${card.cardHolder}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <span className="flex justify-end cursor-default">
                  <AddNewCard addCard={addCard} />
                  </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer hover:border hover:border-blue-500 hover:shadow-md ${
            selectedMethod === "cash" ? "border border-blue-500 shadow-md" : ""
          }`}
          onClick={() => handleSelectMethod("cash")}
        >
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <CardTitle>Cash</CardTitle>
              <CardDescription>
                Pay with cash when your order is delivered.
              </CardDescription>
            </div>
            <img src="/path/to/cash-logo.png" alt="Cash" className="w-8 h-8" />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
