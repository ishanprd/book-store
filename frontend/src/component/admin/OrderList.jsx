import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import MetaData from "../layout/MetaData";
import { Edit, Trash2 } from "lucide-react";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  return (
    <div className="flex">
      <MetaData title="ALL ORDERS - Admin" />
      <SideBar />
      
      <div className="w-full box-border bg-white border-l border-l-black/[0.158] flex flex-col h-screen">
        <h1 className="font-normal text-3xl py-2 box-border text-black/60 transition-all duration-500 m-8 text-center">
          ALL ORDERS
        </h1>
        
        <div className="px-4 w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#A790EA]">
              <TableRow>
                <TableHead className="text-white font-medium">Order ID</TableHead>
                <TableHead className="text-white font-medium">Status</TableHead>
                <TableHead className="text-white font-medium">Items Qty</TableHead>
                <TableHead className="text-white font-medium">Amount</TableHead>
                <TableHead className="text-white font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders && orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-light text-black/70">{order._id}</TableCell>
                  <TableCell className={`font-light ${
                    order.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"
                  }`}>
                    {order.orderStatus}
                  </TableCell>
                  <TableCell className="font-light text-black/70">{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</TableCell>
                  <TableCell className="font-light text-black/70">${order.totalPrice}</TableCell>
                  <TableCell className="flex justify-center gap-4">
                    <Link to={`/admin/order/${order._id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-black/50 hover:text-[#A790EA] hover:bg-[#A790EA]/10"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-black/50 hover:text-red-600 hover:bg-red-50"
                      onClick={() => deleteOrderHandler(order._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;