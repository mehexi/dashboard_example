import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Plus } from "lucide-react";
import { AddLocationModel } from "./AddLocationModel";
import LocationCard from "./LocationCard";

const Step2 = () => {
  const { cartData, handleCartUpdate, setLocation } = useOutletContext();
  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    const getLocation = JSON.parse(localStorage.getItem("locations")) || [];
    setUserLocation(getLocation);
  }, []);

  const handleAddLocation = (updatedLocations) => {
    setUserLocation(updatedLocations);
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
  };

  const handleDeleteLocation = (index) => {
    const updatedLocations = [...userLocation];
    updatedLocations.splice(index, 1);
    setUserLocation(updatedLocations);
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
  };

  return (
    <section className="flex flex-col gap-6">
      {userLocation.length === 0 ? (
        <div className="text-center text-gray-500">No location</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-4">
          {userLocation.map((location, index) => (
            <LocationCard
              key={index}
              data={location}
              setLocation={setLocation}
              onDelete={() => handleDeleteLocation(index)}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <AddLocationModel onAddLocation={handleAddLocation} />
      </div>
    </section>
  );
};

export default Step2;
