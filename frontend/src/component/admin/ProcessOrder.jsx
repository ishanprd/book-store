import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MetaData from "../layout/MetaData";
import { CircleCheck } from "lucide-react";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
      <MetaData title="Process Order" />
      <div className="flex">
        <SideBar />
        <div className="w-full p-4 bg-gray-50">
          {loading ? (
            <Loader />
          ) : (
            <div 
              className={`${
                order.orderStatus === "Delivered" ? "block" : "grid grid-cols-1 md:grid-cols-2 gap-6"
              }`}
            >
              <div>
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Shipping Info</h2>
                    <div className="space-y-2">
                      <div className="flex">
                        <p className="font-medium w-24">Name:</p>
                        <span className="text-gray-700">{order.user && order.user.name}</span>
                      </div>
                      <div className="flex">
                        <p className="font-medium w-24">Phone:</p>
                        <span className="text-gray-700">
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium mb-1">Address:</p>
                        <span className="text-gray-700">
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Payment</h2>
                    <div className="space-y-2">
                      <div className="flex">
                        <p className={`font-medium ${
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="font-medium w-24">Amount:</p>
                        <span className="text-gray-700">${order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Order Status</h2>
                    <div>
                      <p className={`font-medium ${
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Cart Items</h2>
                    <div className="space-y-4">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product} className="flex items-center space-x-4">
                            <img 
                              src={item.image} 
                              alt="Product" 
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <Link 
                                to={`/product/${item.product}`}
                                className="text-[#A790EA] hover:underline"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-gray-600">
                                {item.quantity} X ${item.price} = <span className="font-bold">${item.price * item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {order.orderStatus !== "Delivered" && (
                <div>
                  <Card>
                    <CardContent className="pt-6">
                      <form
                        className="space-y-6"
                        onSubmit={updateOrderSubmitHandler}
                      >
                        <h1 className="text-2xl font-medium text-center">Process Order</h1>

                        <div className="relative">
                          <CircleCheck className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
                          <Select onValueChange={setStatus} value={status}>
                            <SelectTrigger className="w-full pl-10">
                              <SelectValue placeholder="Choose Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="choose">Choose Status</SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#A790EA] hover:bg-[#9370DB]"
                          disabled={loading || status === "" || status === "choose"}
                        >
                          Process
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;