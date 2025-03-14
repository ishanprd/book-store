import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="flex p-4 h-32 items-start box-border">
      <img src={item.image} alt="ssa" className="w-20" />
      <div className="flex flex-col mx-4 my-1">
        <Link 
          to={`/product/${item.product}`}
          className="font-light text-sm text-gray-800 font-serif no-underline"
        >
          {item.name}
        </Link>
        <span className="font-light text-sm text-gray-800 font-sans">{`Price: ₹${item.price}`}</span>
        <p 
          onClick={() => deleteCartItems(item.product)}
          className="text-red-500 font-thin text-xs font-sans cursor-pointer"
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;