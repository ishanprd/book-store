import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.user);
  
  return (
    <nav className="w-full h-20 bg-white flex items-center justify-between px-6 shadow-sm">
    <div className="flex items-center">
  <Link
    to="/"
    className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 hover:text-[#A790EA] transition-colors duration-300"
  >
    📚 Store
  </Link>
</div>


      <div className="hidden lg:flex items-center space-x-8">
        <Link 
          to="/" 
          className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
        >
          Home
        </Link>
        <Link 
          to="/products" 
          className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
        >
          Products
        </Link>
        <Link 
          to="/contact" 
          className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
        >
          Contact
        </Link>
        <Link 
          to="/about" 
          className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
        >
          About
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/search" className="text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300">
          <Search className="h-6 w-6" />
        </Link>
        <Link to="/cart" className="text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300">
          <ShoppingCart className="h-6 w-6" />
        </Link>
        {isAuthenticated ? 
                    <UserOptions user={user} /> : 
                    <div className="">
                      <Button className="h-11 w-20 rounded-lg bg-[#A790EA] hover:bg-[#8a6ad8] text-white">
                        <Link to="/login" className="no-underline text-white">
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  }

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-[#A790EA]">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-white">
            <div className="flex flex-col space-y-6 mt-8">
              <Link 
                to="/" 
                className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/about" 
                className="text-lg text-gray-800/80 hover:text-[#A790EA] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Header;