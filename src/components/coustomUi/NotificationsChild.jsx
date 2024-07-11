import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import moment from "moment";
import { Clock } from "lucide-react";
import axiosInstance from "@/axios/AxiosIntence"; // Adjust import path as per your project structure

const NotificationsChild = ({ initialData, markAsReadInParent }) => {

  console.log(initialData)

  const markAsRead = async () => {
    if (!initialData.read) {
      try {
        await axiosInstance.patch(`/notifications/${initialData._id}/mark-as-read`);
        markAsReadInParent(initialData._id);
      } catch (err) {
        console.error("Error marking notification as read:", err);
      }
    }
  };

  return (
    <Card
      className={`bg-primary-foreground ${
        initialData.read ? "opacity-65" : "border-primary"
      } hover:opacity-100`}
      onMouseEnter={markAsRead}
    >
      <CardHeader>
        <CardDescription>{initialData.message}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <Button className='bg-secondary-foreground opacity-100'>Review</Button>
        <CardDescription className="flex items-center gap-1">
          <Clock size={14} /> {moment(initialData.createdAt).fromNow()}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default NotificationsChild;
