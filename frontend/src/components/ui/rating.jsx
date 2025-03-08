
import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";


export const Rating= ({
  value = 0,
  onChange,
  readOnly = false,
  className,
  size = 24,
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (currentValue) => {
    if (!readOnly && onChange) {
      onChange(currentValue);
    }
  };

  const handleMouseEnter = (currentValue) => {
    if (!readOnly) {
      setHoverValue(currentValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <Star
          key={starValue}
          size={size}
          className={cn(
            "cursor-pointer text-gray-300 transition-colors duration-200",
            {
              "fill-yellow-500 text-yellow-500":
                starValue <= (hoverValue || value),
              "cursor-default": readOnly,
            }
          )}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};