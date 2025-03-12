import React from "react";
import { Rating } from "@/components/ui/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
      <div className="flex items-center space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage 
            src={profilePng} 
            alt={`${review.name}'s profile`} 
            className="object-cover"
          />
          <AvatarFallback>
            {review.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <p className="font-semibold text-gray-800">{review.name}</p>
          <Rating 
            value={review.rating} 
            readOnly 
            className="mt-1"
          />
        </div>
      </div>
      
      <p className="text-gray-600 italic">"{review.comment}"</p>
    </div>
  );
};

export default ReviewCard;