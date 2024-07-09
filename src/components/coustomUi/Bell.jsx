import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Bell as BellIcon } from "lucide-react";
import axiosInstance from "@/axios/AxiosIntence";
import { io } from "socket.io-client";
import NotificationsChild from "./NotificationsChild";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const Bell = () => {
  const userId = localStorage.getItem("uID");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance(`/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 1000);
    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="relative">
          <Button variant="outline">
            <BellIcon size={18} />
          </Button>
          {notifications.length > 0 && (
            <h1 className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-sm">
              {notifications.length}
            </h1>
          )}
        </span>
      </SheetTrigger>
      <SheetContent className='pt-10'>
        <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="read">Read</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
      </TabsList>
        </Tabs>

        {notifications.length > 0 ? (
          <ul  className="mt-6 flex flex-col gap-3">
            {notifications.map((notification) => (
              <NotificationsChild key={notification._id} data={notification} />
            ))}
          </ul>
        ) : (
          <p>No new notifications</p>
          )}

      </SheetContent>
    </Sheet>
  );
};

export default Bell;