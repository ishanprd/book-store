import React from "react";
import { Link } from "react-router-dom";
import { Star, StarHalf } from "lucide-react";

const Product = ({ product }) => {
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <Star
            key={`full-${index}`}
            className="fill-[#A790EA] text-[#A790EA] w-5 h-5"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="fill-[#A790EA] text-[#A790EA] w-5 h-5" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <Star
            key={`empty-${index}`}
            className="text-[#A790EA] w-5 h-5 stroke-[#A790EA]"
          />
        ))}
        <span className="ml-2 font-light text-[0.7vmax] font-['Roboto'] md:text-[1vmax]">
          {`(${product.numberOfReviews} Reviews)`}
        </span>
      </div>
    );
  };

  return (
    <Link
      className="w-[15vmax] flex flex-col text-[rgb(48,48,48)] no-underline m-[2vmax] transition-all duration-500 pb-[0.5vmax] hover:shadow-md hover:-translate-y-[1vmax]"
      to={`/product/${product._id}`}
    >
      <img
        className="w-[14vmax] h-[14vmax] object-cover"
        src={product.images[0].url}
        alt={product.name}
      />

      <div className="m-[0.5vmax] flex justify-start items-center md:block">
        {renderRating(product.rating)}
      </div>

      <p className="font-['Roboto'] text-[1.2vmax] my-[1vmax] mx-[0.5vmax] mb-0 md:text-[1.7vmax]">
        {product.name}
      </p>

      <span className="m-[0.5vmax] text-[#A790EA] font-['Franklin_Gothic_Medium','Arial_Narrow',Arial,sans-serif] text-[1vmax] md:text-[1.5vmax]">
        {`₹${product.price}`}
      </span>
    </Link>
  );
};

export default Product;
