import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { CreditCard, Calendar, Key } from "lucide-react";
import { createOrder, clearErrors } from "../../actions/orderAction";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      const { data } = await axios.post(
        "http://localhost:5173/api/v1/payment/process",
        paymentData,
        config
      );
      
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.adress,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country
            }
          }
        }
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There is some issue processing this payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="flex justify-center items-center min-h-[65vh] my-8 mx-8">
        <Card className="w-full md:w-96">
          <CardContent className="pt-6">
            <form onSubmit={submitHandler} className="space-y-6">
              <h2 className="text-xl font-medium text-center pb-4 border-b border-gray-200">Card Info</h2>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <CreditCard size={20} />
                </div>
                <div className="pl-10 py-2 w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-[#A790EA] focus-within:border-[#A790EA]">
                  <CardNumberElement className="w-full outline-none" />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Calendar size={20} />
                </div>
                <div className="pl-10 py-2 w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-[#A790EA] focus-within:border-[#A790EA]">
                  <CardExpiryElement className="w-full outline-none" />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Key size={20} />
                </div>
                <div className="pl-10 py-2 w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-[#A790EA] focus-within:border-[#A790EA]">
                  <CardCvcElement className="w-full outline-none" />
                </div>
              </div>
              
              <Button 
                type="submit"
                ref={payBtn}
                className="w-full bg-[#A790EA] hover:bg-[#9478E0] transition-colors duration-300"
              >
                Pay - ₹{orderInfo && orderInfo.totalPrice}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Payment;