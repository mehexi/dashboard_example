import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function AddLocationModel({ onAddLocation }) {
  const [countries, setCountries] = useState([]);
  const [addressType, setAddressType] = useState("home");
  const [fullName, setFullName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+991");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [useAsDefault, setUseAsDefault] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleSubmit = () => {
    const phone = `${phonePrefix}${phoneNumber}`;
    const formData = {
      addressType,
      fullName,
      phone,
      address,
      city,
      state,
      zipCode,
      selectedCountry,
      useAsDefault,
    };

    const existingLocations =
      JSON.parse(localStorage.getItem("locations")) || [];
    const updatedLocations = [...existingLocations, formData];
    localStorage.setItem("locations", JSON.stringify(updatedLocations));

    console.log(updatedLocations);

    onAddLocation(updatedLocations);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="items-center w-fit mx-auto flex gap-2"
        >
          <Plus size={18} /> Add new Address
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            defaultValue="home"
            onValueChange={setAddressType}
            className="flex items-center gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="home" id="r1" />
              <label htmlFor="r1">Home</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="office" id="r2" />
              <label htmlFor="r2">Office</label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
            />
            <div className="flex items-center gap-2">
              <Input
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                className="w-24"
                placeholder="+991"
              />
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Town/city"
              />
              <Input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
              />
              <Input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Zip/code"
              />
            </div>
            <Select onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue>
                  {selectedCountry || "Choose a country"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.length > 0 ? (
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem
                        key={country.cca2}
                        value={country.name.common}
                      >
                        <span className="flex items-center gap-2">
                          <img
                            src={country.flags.png}
                            alt=""
                            className="rounded-full h-5 w-5"
                          />{" "}
                          {country.name.common}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ) : (
                  <div>Loading countries...</div>
                )}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="defaultAddress"
                checked={useAsDefault}
                onChange={(e) => setUseAsDefault(e.target.checked)}
              />
              <label htmlFor="defaultAddress">
                Use this address as default.
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Add location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
