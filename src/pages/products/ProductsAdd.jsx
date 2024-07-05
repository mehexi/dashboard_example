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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "@/axios/AxiosIntence";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const ProductsAdd = () => {
  const [images, setImages] = useState([]);
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
  const [requestIdentifier, setRequestIdentifier] = useState(null);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [
          ...prevImages,
          { file, dataUrl: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
    if (saveButtonState === "loading") return;
  
    setSaveButtonState("loading");
  
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("status", productData.status);
    formData.append("sku", productData.sku);
    formData.append("stock", productData.stock);
  
    const imageUrls = [];
  
    try {
      // Upload images to ImageBB and get URLs
      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("image", image.file);
  
        const response = await axios.post('https://api.imgbb.com/1/upload', imageFormData, {
          params: {
            key: '710f97496926ec3fd8de1a493d615423', 
          },
        });
  
        const imageUrl = response.data.data.url;
        imageUrls.push(imageUrl);
      }
  
      // Append image URLs to form data
      imageUrls.forEach((url) => {
        formData.append("imageUrls", url);
      });
  
      const requestId = uuidv4();
      setRequestIdentifier(requestId);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Submit form data to your backend
      const result = await axiosInstance.post("/client/products", formData, {
        headers: {
          'X-Request-Id': requestId
        }
      });
  
      console.log(result);
      setSaveButtonState("saved");
      setTimeout(() => {
        setSaveButtonState("default");
        navigate('/products'); // Redirect to the products list or another appropriate page
      }, 1000);
    } catch (error) {
      console.log(error);
      setSaveButtonState("default");
    }
  };

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
              Add Product
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
                        value={productData.status}
                        onValueChange={(value) =>
                          setProductData((prevData) => ({
                            ...prevData,
                            status: value,
                          }))
                        }
                      >
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Add or remove product images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {images.length > 0 && (
                      <div className="relative">
                        <img
                          alt="Product image 1"
                          className="aspect-square rounded-md object-cover"
                          src={images[0].dataUrl}
                          height="300"
                          width="300"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-white/20 h-8 backdrop-blur border flex items-center justify-center w-8 text-white rounded-full p-1"
                          onClick={() => handleRemoveImage(0)}
                        >
                          &#10005;
                        </button>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      {images.slice(1).map((image, index) => (
                        <div key={index + 1} className="relative">
                          <img
                            alt={`Product image ${index + 2}`}
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src={image.dataUrl}
                            width="84"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 border rounded-full h-2 w-2 bg-white/20 blur"
                            onClick={() => handleRemoveImage(index + 1)}
                          ></button>
                        </div>
                      ))}
                      <div>
                        <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            name="images"
                            className="hidden"
                            onChange={handleAddImage}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button type="button" variant="outline" size="sm">
              Discard
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
        </form>
      </main>
    </section>
  );
};

export default ProductsAdd;
