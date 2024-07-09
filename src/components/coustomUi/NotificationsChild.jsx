import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const NotificationsChild = ({ data }) => {
  console.log(data);

  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardDescription>{data.message}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Review</Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsChild;
