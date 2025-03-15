import React from "react";
import { Truck, CheckSquare, CreditCard } from "lucide-react";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: Truck,
    },
    {
      label: "Confirm Order",
      icon: CheckSquare,
    },
    {
      label: "Payment",
      icon: CreditCard,
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                  activeStep >= index 
                    ? "border-[#A790EA] bg-[#A790EA] text-white" 
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {React.createElement(step.icon, { size: 20 })}
              </div>
              <span 
                className={`mt-2 text-sm font-medium ${
                  activeStep >= index ? "text-[#A790EA]" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`h-1 w-16 flex-shrink-0 ${
                  activeStep > index ? "bg-[#A790EA]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;