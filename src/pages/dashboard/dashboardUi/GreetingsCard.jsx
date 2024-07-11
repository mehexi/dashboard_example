import axiosInstance from "@/axios/AxiosIntence";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import greetings from '/The-MFR-Directory.webp'
import { Button } from "@/components/ui/button";

const GreetingsCard = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("uID");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance(`/general/users/${userId}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <Card></Card>;
  }

  return (
    <Card className="bg-gradient-to-r from-violet-900/50 via-violet-900/50 to-indigo-900/25 min-h-80 col-span-5 flex flex-col md:flex-row justify-between items-center p-4">
      <CardHeader className="max-w-full md:max-w-sm flex-1 mb-4 md:mb-0">
        <CardTitle className="text-lg md:text-xl">
          Hello {user.name}! Ready to dive in? Let's get started!
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Check out your latest orders, track your performance, and find insights.
        </CardDescription>
        <Button className="!mt-6 w-fit">
          Go now
        </Button>
      </CardHeader>
      <CardContent className="flex justify-center md:justify-end w-full md:w-auto">
        <img src={greetings} alt="" className="w-auto md:max-w-80" draggable={false} />
      </CardContent>
    </Card>
  );
};

export default GreetingsCard;
