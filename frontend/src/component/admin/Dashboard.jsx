import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#A790EA"],
        hoverBackgroundColor: ["#4B5000", "#8A73C7"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] w-screen max-w-full">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="border-l border-gray-200 bg-white p-12">
      <h1 className="text-4xl font-semibold text-gray-800 text-center w-full mx-auto py-6">
       Dashboard
    </h1>

        <div className="flex flex-wrap justify-center gap-10 mt-12">
      <Link
        to="/admin/products"
        className="bg-gradient-to-br from-gray-500 to-blue-900 text-white rounded-3xl w-52 h-52 flex flex-col items-center justify-center text-center no-underline shadow-2xl hover:scale-105 transform transition-all duration-300"
      >
        <p className="text-2xl font-semibold">Products</p>
        <p className="text-4xl font-bold">{products?.length}</p>
      </Link>

      <Link
        to="/admin/orders"
        className="bg-white border-2 border-gray-500 text-gray-500 rounded-3xl w-52 h-52 flex flex-col items-center justify-center text-center no-underline shadow-xl hover:bg-gray-100 hover:scale-105 transform transition-all duration-300"
      >
        <p className="text-2xl font-semibold">Orders</p>
        <p className="text-4xl font-bold">{orders?.length}</p>
      </Link>

      <Link
        to="/admin/users"
        className="bg-gradient-to-br from-blue-900 to-gray-400 text-white rounded-3xl w-52 h-52 flex flex-col items-center justify-center text-center no-underline shadow-2xl hover:scale-105 transform transition-all duration-300"
      >
        <p className="text-2xl font-semibold">Users</p>
        <p className="text-4xl font-bold">{users?.length}</p>
      </Link>
    </div>

        {/* 
        <div className="w-4/5 mx-auto">
          <Line data={lineState} options={chartOptions} />
        </div>

        <div className="w-96 mx-auto">
          <Doughnut data={doughnutState} />
        </div>
        */}
      </div>
    </div>
  );
};

export default Dashboard;