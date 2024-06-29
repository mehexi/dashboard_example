import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LocationCard = ({ data, onDelete, setLocation }) => {
  const {
    address,
    addressType,
    city,
    fullName,
    phone,
    selectedCountry,
    state,
    useAsDefault,
    zipCode,
  } = data;

  const navigate = useNavigate()

  return (
    <Card className="w-full col-span-4 bg-primary-foreground">
      <CardHeader>
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <CardTitle className="capitalize">
            {fullName} ({addressType})
          </CardTitle>
          {useAsDefault && (
            <Badge variant="outline">
              Default
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <CardDescription className='capitalize'>
            {address}, {city}, {selectedCountry}, [{zipCode}]
          </CardDescription>
          <CardDescription>{phone}</CardDescription>
        </div>
        <div className="flex gap-2 items-center mt-2 sm:mt-0">
          {!useAsDefault && (
            <Button
              variant="danger"
              className="flex gap-2 items-center text-red-400"
              onClick={onDelete}
            >
              <Trash2 size={14} /> Delete
            </Button>
          )}
          <Button
            onClick={() => {
              setLocation(data);
              navigate('/checkout/step3')
            }}
            variant="outline"
          >
            Deliver to this address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
