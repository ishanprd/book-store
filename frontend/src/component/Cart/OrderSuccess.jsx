import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "@/actions/cartAction";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    toast.success("Order placed successfully!", {
      duration: 4000,
      position: "top-center",
    });
    
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] p-10">
      <Card className="w-full max-w-md text-center">
        <CardContent className="flex flex-col items-center justify-center gap-6 pt-6">
          <CheckCircle className="h-16 w-16 md:h-24 md:w-24 text-[#A790EA]" />
          
          <h1 className="text-2xl md:text-3xl font-semibold">
            Your Order has been Placed successfully
          </h1>
          
          <Button 
            asChild 
            className="bg-[#A790EA] hover:bg-[#9177db] text-white px-6 py-2 font-medium rounded-md"
          >
            <Link to="/orders">View Orders</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;