import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TimeDifference from "@/utility/calculateTimeDiff";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const SelectedUserCard = ({ data }) => {
  const {
    city,
    country,
    createdAt,
    email,
    name,
    phoneNumber,
    transactions,
    occupation,
  } = data;
  console.log(createdAt);

  return (
    <Card className="flex p-6 gap-9 bg-primary-foreground">
      <div className="aspect-square h-[340px] rounded-lg animate-gradient"></div>
      <div className="flex flex-col justify-between">
        <div>
          <CardTitle className="text-2xl">{name}  </CardTitle>
          <CardDescription className="flex gap-2 items-center">{occupation} <Clock className="w-4 h-4" /> <TimeDifference givenDate={createdAt} /></CardDescription>
              
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1>Adress</h1>
            <CardDescription className={'flex items-center gap-2'}>
            <MapPin className="w-4 h-4"/>  {city} , {country}
            </CardDescription>
          </div>
          <div className="flex gap-14">
            <div>
              <h1>Phone Number</h1>
              <CardDescription className={'flex items-center gap-2'}><Phone className="w-4 h-4" />  +{phoneNumber}</CardDescription>
            </div>
            <div>
              <h1>Email</h1>
              <CardDescription className={'flex items-center gap-2'}> <Mail className="w-4 h-4" /> {email}</CardDescription>
            </div>
            <div className="ml-auto">
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SelectedUserCard;
