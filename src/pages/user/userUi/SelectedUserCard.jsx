import axiosInstance from "@/axios/AxiosIntence";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TimeDifference from "@/utility/calculateTimeDiff";
import axios from "axios";
import { Clock, Mail, MapPin, Pencil, Phone, Plus } from "lucide-react";
import React, { useState } from "react";

const SelectedUserCard = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(data.photoURL || "");
  
  const [formData, setFormData] = useState({
    city: data.city || "",
    country: data.country || "",
    email: data.email || "",
    name: data.name || "",
    phoneNumber: data.phoneNumber || "",
    occupation: data.occupation || "",
    photoURL: data.photoURL || "",
    address: data.address || "",
    zipCode: data.zipCode || "",
    state: data.state || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photoURL' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    let updatedPhotoURL = formData.photoURL;
  
    if (formData.photoURL instanceof File) {
      try {
        const formDataImg = new FormData();
        formDataImg.append('image', formData.photoURL);
  
        const response = await axios.post('https://api.imgbb.com/1/upload', formDataImg, {
          params: {
            key: '710f97496926ec3fd8de1a493d615423', 
          },
        });
  
        updatedPhotoURL = response.data.data.url;
  
        console.log('Image URL:', updatedPhotoURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        return; // Exit the function if image upload fails
      }
    }
  
    try {
      const updatedFormData = {
        ...formData,
        photoURL: updatedPhotoURL,
      };
  
      const response = await axiosInstance.patch(`/general/users/${data._id}`, updatedFormData);
      console.log('Response data:', response.data);
      setFormData(updatedFormData);
      setIsEdit(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  

  const handleCancel = () => {
    setFormData({ ...data });
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <Card className="relative bg-primary-foreground p-6 flex gap-9">
          <div className="flex gap-3 absolute right-6">
            <Button onClick={handleSave} className="">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" className="">
              Cancel
            </Button>
          </div>
          <Label htmlFor="image" className="h-[340px] aspect-square">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Button
                className="w-full h-full pointer-events-none"
                variant="outline"
              >
                <Plus size={18} /> Add An Image
              </Button>
            )}
            <Input
              id="image"
              className="hidden"
              type="file"
              onChange={handleChange}
              name="photoURL"
            />
          </Label>
          <div className="max-w-md">
            <form className=" grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Contacts Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  name="phoneNumber"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  name="address"
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    name="city"
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    name="state"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="zipCode">Zip code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode || ""}
                    onChange={handleChange}
                    name="zipCode"
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                    name="country"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation || ""}
                  onChange={handleChange}
                  name="occupation"
                />
              </div>
            </form>
          </div>
        </Card>
      ) : (
        <Card className="flex p-6 gap-9 bg-primary-foreground max-md:flex-col relative">
          <Button
            onClick={() => setIsEdit(true)}
            variant="outline"
            size="icon"
            className="absolute right-6 bg-primary-foreground"
          >
            <Pencil size={14} />
          </Button>
          {data.photoURL ? (
            <img
              src={formData.photoURL}
              alt="user"
              className="h-[340px] aspect-square object-fill rounded-lg"
              draggable={false}
            />
          ) : (
            <div className="aspect-square h-[340px] rounded-lg animate-gradient"></div>
          )}
          <div className="flex flex-col justify-between max-md:gap-6">
            <div>
              <CardTitle className="text-2xl">{formData.name}</CardTitle>
              <CardDescription className="flex gap-2 items-center">
                {formData.occupation} <Clock className="w-4 h-4" />{" "}
                <TimeDifference givenDate={data.createdAt} />
              </CardDescription>
            </div>
            <div className="flex flex-col gap-12">
              <div>
                <h1>Address</h1>
                <CardDescription className={"flex items-center gap-2"}>
                  <MapPin className="w-4 h-4" /> {formData.city} ,{" "}
                  {formData.country}
                </CardDescription>
              </div>
              <div className="flex gap-14 max-md:gap-3">
                <div>
                  <h1>Phone Number</h1>
                  <CardDescription className={"flex items-center gap-2"}>
                    <Phone className="w-4 h-4" /> +{formData.phoneNumber}
                  </CardDescription>
                </div>
                <div>
                  <h1>Email</h1>
                  <CardDescription className={"flex items-center gap-2"}>
                    <Mail className="w-4 h-4" /> {formData.email}
                  </CardDescription>
                </div>
                <div className="ml-auto"></div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default SelectedUserCard;
