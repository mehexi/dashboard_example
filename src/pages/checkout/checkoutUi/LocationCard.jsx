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

  return (
    <Card className="w-full col-span-4 bg-primary-foreground">
      <CardHeader>
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <CardTitle className="capitalize">
            {fullName} ({addressType})
          </CardTitle>
          {useAsDefault && (
            <div className="px-2 py-1 border rounded-full text-xs bg-secondary">
              Default
            </div>
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
