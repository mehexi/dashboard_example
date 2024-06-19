import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React from "react";
  
  const TitleCard = ({ title, data }) => {
    const formattedData = Number(data).toLocaleString();
  
    return (
      <Card>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>$ {formattedData}</CardTitle>
        </CardContent>
      </Card>
    );
  };
  
  export default TitleCard;
  