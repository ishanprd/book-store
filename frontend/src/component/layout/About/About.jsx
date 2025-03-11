import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Youtube, Instagram } from "lucide-react";

const About = () => {

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#A790EA] to-purple-500">
      <div className="absolute inset-0 bg-[#A790EA] opacity-50"></div>
      
      <div className="relative z-10 bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-[#A790EA]">About Us</h1>
        
        <div>
          <Avatar className="w-40 h-40 mx-auto mb-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_SQK2eJgvMn0oK1iMpwE3eHkyMijQmT0DQ&s" 
              alt="Founder" 
              className="rounded-full object-cover"
            />
          </Avatar>
          
          <h2 className="text-xl font-semibold mb-2">Book Store</h2>
          
          
          <p className="text-gray-600 mb-6">
            This is an Book Store app for selling all the books that interest you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;