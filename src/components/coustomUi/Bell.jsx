import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Bell as BellIcon } from "lucide-react";
import { io } from "socket.io-client";
import NotificationsChild from "./NotificationsChild";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import axiosInstance from "@/axios/AxiosIntence";
import { ScrollArea } from "../ui/scroll-area";

const Bell = () => {
  const userId = localStorage.getItem("uID");
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const socket = io("http://localhost:5001");

    const fetchNotification = async () => {
      try {
        const response = await axiosInstance(`/notifications/${userId}`);
        setNotifications(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotification();

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("register", userId);
    });

    socket.on("newNotification", ({ socketUserId, notifications }) => {
      console.log("New notification received", socketUserId, notifications);

      if (socketUserId === userId) {
        setNotifications((prevNotifications) => [
          ...notifications,
          ...prevNotifications,
        ]);
      }
    });

    // Clean up socket connection
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const allCount = notifications.length;
  const readCount = notifications.filter(notification => notification.read).length;
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "read") return notification.read;
    if (filter === "unread") return !notification.read;
    return true;
  });

  const markAsReadInParent = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="relative">
          <Button variant="outline">
            <BellIcon size={18} />
          </Button>
          {unreadCount > 0 && (
            <h1 className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-sm">
              {unreadCount}
            </h1>
          )}
        </span>
      </SheetTrigger>
      <SheetContent className="">
        {notifications.length > 0 ? (
          <ScrollArea className="flex flex-col gap-3 h-svh">
            <div className="absolute z-10 w-full">
              <Tabs value={filter} onValueChange={setFilter} className="py-3 w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all" className="grid-cols-1 bg-primary-foreground/20 backdrop-blur-lg">
                    All ({allCount})
                  </TabsTrigger>
                  <TabsTrigger value="read" className="grid-cols-1 bg-primary-foreground/20 backdrop-blur-lg">
                    Read ({readCount})
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="grid-cols-1 bg-primary-foreground/20 backdrop-blur-lg">
                    Unread ({unreadCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="mb-16 mt-16 flex flex-col gap-3">
              {filteredNotifications.map((notification) => (
                <NotificationsChild
                  key={notification._id}
                  initialData={notification}
                  markAsReadInParent={markAsReadInParent}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p>No new notifications</p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Bell;
