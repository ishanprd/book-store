import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  const DetailSection = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-medium mb-4">{title}</h2>
      <div className="pl-2 space-y-3">{children}</div>
    </div>
  );

  const DetailItem = ({ label, value, className = "" }) => (
    <div className="flex flex-wrap items-start">
      <p className="font-medium w-24">{label}</p>
      <span className={`text-gray-600 ml-2 flex-1 ${className}`}>{value}</span>
    </div>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="bg-white min-h-screen p-4 md:p-8">
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-medium text-[#A790EA]">
                  Order #{order && order._id}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <DetailSection title="Shipping Info">
                  <DetailItem 
                    label="Name:" 
                    value={order.user && order.user.name} 
                  />
                  <DetailItem 
                    label="Phone:" 
                    value={order.shippingInfo && order.shippingInfo.phoneNo} 
                  />
                  <DetailItem 
                    label="Address:" 
                    value={
                      order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                    } 
                  />
                </DetailSection>

                <DetailSection title="Payment">
                  <DetailItem 
                    label="Status:" 
                    value={
                      order.paymentInfo && order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"
                    }
                    className={
                      order.paymentInfo && order.paymentInfo.status === "succeeded"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  />
                  <DetailItem 
                    label="Amount:" 
                    value={`₹${order.totalPrice && order.totalPrice}`} 
                  />
                </DetailSection>

                <DetailSection title="Order Status">
                  <Badge 
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </Badge>
                </DetailSection>

                <Separator className="my-4" />

                <div className="mt-6">
                  <h2 className="text-xl md:text-2xl font-medium mb-4">Order Items:</h2>
                  <div className="space-y-4 mt-4">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div 
                          key={item.product}
                          className="flex flex-wrap md:flex-nowrap items-center py-3 border-b last:border-0"
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-contain rounded" 
                          />
                          <Link 
                            to={`/product/${item.product}`}
                            className="text-gray-700 hover:text-[#A790EA] mx-4 md:w-1/2 font-medium transition-colors"
                          >
                            {item.name}
                          </Link>
                          <span className="text-gray-600 ml-auto mt-2 md:mt-0">
                            {item.quantity} × ₹{item.price} = {" "}
                            <span className="font-bold">₹{item.price * item.quantity}</span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;