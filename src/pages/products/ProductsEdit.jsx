import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/axios/AxiosIntence";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProductsEdit = () => {
  const loaderData = useLoaderData();
  const product = loaderData.data.data;

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    status: "draft",
    sku: "",
    stock: 0,
  });
  const [saveButtonState, setSaveButtonState] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status,
        sku: product.sku,
        stock: product.stock,
      });
      setExistingImages(product.images);
    }
  }, [product]);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImages((prevImages) => [
          ...prevImages,
          { file, dataUrl: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index, isNewImage = false) => {
    if (isNewImage) {
      setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveButtonState("loading");

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("status", productData.status);
    formData.append("sku", productData.sku);
    formData.append("stock", productData.stock);

    // Append existing images URLs
    existingImages.forEach((imageUrl) => formData.append("existingImages", imageUrl));

    // Append new image files
    newImages.forEach((image) => formData.append("newImages", image.file));

    try {
      let result;
      if (product._id) {
        result = await axiosInstance.patch(`/client/products/${product._id}`, formData);
      }
      console.log(result);
      setSaveButtonState("saved");
      setTimeout(() => {
        setSaveButtonState("default");
      }, 1000);
    } catch (error) {
      console.log(error);
      setSaveButtonState("default");
    }
  };

  const URL = "http://localhost:5001";

  return (
    <section className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Edit Product
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="button" variant="outline" size="sm">
                Discard
              </Button>
              <Button type="button" size="sm" variant="secondary">
                Archive Product
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={saveButtonState === "loading"}
              >
                {saveButtonState === "loading" && <span>Loading...</span>}
                {saveButtonState === "saved" && <span>Saved!</span>}
                {saveButtonState === "default" && <span>Save Product</span>}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Fill in the product details below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full"
                        value={productData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        className="min-h-32"
                        value={productData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>Provide stock information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">
                          <Input
                            id="sku"
                            name="sku"
                            type="text"
                            value={productData.sku}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="stock-1" className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-1"
                            name="stock"
                            type="number"
                            value={productData.stock}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            name="price"
                            type="number"
                            value={productData.price}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        defaultValue={productData.status}
                        onValueChange={(value) =>
                          setProductData((prevData) => ({
                            ...prevData,
                            status: value,
                          }))
                        }
                      >
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>
                    Attach product images here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Label>Image Upload</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAddImage}
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {existingImages.map((imageUrl, index) => (
                        <div key={index} className="relative w-32 h-32">
                          <img
                            src={`${URL}/${imageUrl}`}
                            alt={`Product Image ${index + 1}`}
                            className="object-cover w-full h-full rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <span className="sr-only">Remove image</span>
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {newImages.map((image, index) => (
                        <div key={index} className="relative w-32 h-32">
                          <img
                            src={image.dataUrl}
                            alt={`New Product Image ${index + 1}`}
                            className="object-cover w-full h-full rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1"
                            onClick={() => handleRemoveImage(index, true)}
                          >
                            <span className="sr-only">Remove new image</span>
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex md:hidden">
            <Button
              type="submit"
              className="w-full"
              disabled={saveButtonState === "loading"}
            >
              {saveButtonState === "loading" && <span>Loading...</span>}
              {saveButtonState === "saved" && <span>Saved!</span>}
              {saveButtonState === "default" && <span>Save Product</span>}
            </Button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default ProductsEdit;
