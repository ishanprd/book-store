import React from "react";
import { Button } from "@/components/ui/button";
import { GlobeIcon, Mail, PhoneIcon } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">We'd love to hear from you</p>
          <div className="h-1 w-20 bg-[#A790EA] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center p-4 bg-purple-50 rounded-lg transition-all hover:bg-purple-100">
            <div className="bg-purple-200 p-3 rounded-full mr-4">
              <Mail  className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Email Us</h3>
              <a 
                href="mailto:bookstore@gmail.com" 
                className="text-purple-700 hover:text-purple-900 font-medium"
              >
                bookstore@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-purple-50 rounded-lg transition-all hover:bg-purple-100">
            <div className="bg-purple-200 p-3 rounded-full mr-4">
              <PhoneIcon className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Call Us</h3>
              <p className="text-purple-700 font-medium">+977 9859658593</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-purple-50 rounded-lg transition-all hover:bg-purple-100">
            <div className="bg-purple-200 p-3 rounded-full mr-4">
              <GlobeIcon className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Visit Us</h3>
              <p className="text-purple-700 font-medium">Kupondol, Nepal</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="mailto:bookstore@gmail.com"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="inline-block"
          >
            <Button 
              className={`bg-[#A790EA] hover:bg-[#8F75D1] text-white px-8 py-6 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 ${hovered ? 'scale-105' : 'scale-100'}`}
            >
              Send us a message
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;