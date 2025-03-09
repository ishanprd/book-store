import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  FilePlus,
  Plus,
  AlignLeft,
  LayoutDashboard,
  Users,
  Star,
  Package
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-white flex flex-col py-16 max-w-[250px]">
      <Link to="/" className="px-0 hover:scale-105 transition-transform duration-500">
        <img src={logo} alt="Ecommerce" className="w-1/2 mx-auto hover:filter hover:drop-shadow-lg transition-all duration-500" />
      </Link>
      
      <Link to="/admin/dashboard" className="text-gray-600 font-light text-base py-8 px-8 hover:text-[#A790EA] hover:scale-105 transition-all duration-500 flex items-center">
        <LayoutDashboard className="mr-2" size={20} />
        Dashboard
      </Link>
      
      <div className="px-8 text-gray-600">
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center w-full justify-between font-light text-base hover:text-[#A790EA] hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <Package className="mr-2" size={20} />
              Products
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8">
            <Link to="/admin/products" className="flex items-center py-2 text-gray-600 hover:text-[#A790EA] transition-colors">
              <FilePlus className="mr-2" size={18} />
              All
            </Link>
            <Link to="/admin/product" className="flex items-center py-2 text-gray-600 hover:text-[#A790EA] transition-colors">
              <Plus className="mr-2" size={18} />
              Create
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <Link to="/admin/orders" className="text-gray-600 font-light text-base py-8 px-8 hover:text-[#A790EA] hover:scale-105 transition-all duration-500 flex items-center">
        <AlignLeft className="mr-2" size={20} />
        Orders
      </Link>
      
      <Link to="/admin/users" className="text-gray-600 font-light text-base py-8 px-8 hover:text-[#A790EA] hover:scale-105 transition-all duration-500 flex items-center">
        <Users className="mr-2" size={20} />
        Users
      </Link>
      
      <Link to="/admin/reviews" className="text-gray-600 font-light text-base py-8 px-8 hover:text-[#A790EA] hover:scale-105 transition-all duration-500 flex items-center">
        <Star className="mr-2" size={20} />
        Reviews
      </Link>
    </div>
  );
};

export default Sidebar;