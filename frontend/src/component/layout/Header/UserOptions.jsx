import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from "../../../actions/userAction";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  ClipboardList, 
  ShoppingCart 
} from 'lucide-react';

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  }

  const options = [
    { icon: <ClipboardList className="h-4 w-4 mr-2" />, name: "Orders", func: orders },
    { icon: <User className="h-4 w-4 mr-2" />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart
          className="h-4 w-4 mr-2"
          style={{ color: cartItems.length > 0 ? "tomato" : "currentColor" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <LogOut className="h-4 w-4 mr-2" />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <div className="z-50">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="h-14 w-14 rounded-full p-0 bg-transparent hover:bg-transparent">
            <Avatar className="h-11 w-11 border-2 border-[#A790EA]">
              <img
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          {options.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={item.func}
              className="flex items-center cursor-pointer py-2"
            >
              {item.icon}
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserOptions;