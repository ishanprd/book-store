import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { Country, State } from "country-state-city";
import { Home, MapPin, Building, Globe, Phone, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import toast from "react-hot-toast";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/login/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="flex justify-center items-center w-full">
        <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6 my-8">
          <form 
            className="flex flex-col space-y-6"
            onSubmit={shippingSubmit}
          >
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Address"
                required
                className="pl-10"
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="City"
                required
                className="pl-10"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="number"
                placeholder="Pin Code"
                required
                className="pl-10"
                value={pinCode || ""}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="number"
                placeholder="Phone Number"
                required
                className="pl-10"
                value={phoneNo || ""}
                onChange={(e) => setPhoneNo(e.target.value)}
                maxLength="10"
              />
            </div>

            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Select 
                value={country || ""} 
                onValueChange={setCountry}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {Country && Country.getAllCountries().map((item) => (
                    <SelectItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {country && (
              <div className="relative">
                <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Select 
                  value={state || ""} 
                  onValueChange={setState}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {State && State.getStatesOfCountry(country).map((item) => (
                      <SelectItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#A790EA] hover:bg-[#8e75d9] text-white"
              disabled={!state}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;