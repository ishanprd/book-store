import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction.js";
import { addItemsToCart } from "../../actions/cartAction.js";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";

import Loader from "../layout/Loader/Loader.jsx";
import ReviewCard from "./ReviewCard.jsx";
import MetaData from "../layout/MetaData.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen((prev) => !prev);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title={`${product.name} -- ECOMMERCE`} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="relative w-full">
          {product.images && product.images.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((item, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={item.url}
                      alt={`${i} Slide`}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Show Arrows Only If More Than One Image */}
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-100"
                    style={{ color: "black", stroke: "black" }} // Adding custom arrow color
                  />
                  <CarouselNext
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-100"
                    style={{ color: "black", stroke: "black" }} // Adding custom arrow color
                  />
                </>
              )}
            </Carousel>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-500">Product # {product._id}</p>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <Rating value={product.rating} readOnly />
            <span className="text-gray-600">
              ({product.numOfReviews} Reviews)
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-[#A790EA]">
              ₹{product.price}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
                  -
                </Button>
                <input
                  readOnly
                  type="number"
                  value={quantity}
                  className="w-12 text-center"
                />
                <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                  +
                </Button>
              </div>

              <Button
                onClick={addToCartHandler}
                disabled={product.Stock < 1}
                className="bg-[#A790EA] hover:bg-purple-700"
              >
                Add to Cart
              </Button>
            </div>

            <p>
              Status:{" "}
              <span
                className={
                  product.Stock < 1 ? "text-red-500" : "text-green-500"
                }
              >
                {product.Stock < 1 ? "Out of Stock" : "In Stock"}
              </span>
            </p>

            <div>
              <h4 className="font-semibold">Description:</h4>
              <p className="text-gray-600">{product.descreption}</p>
            </div>

            <Button
              onClick={submitReviewToggle}
              variant="outline"
              className="mt-4"
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={submitReviewToggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Review</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Rating value={rating} onChange={(value) => setRating(value)} />

            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={submitReviewToggle}>
              Cancel
            </Button>
            <Button
              onClick={reviewSubmitHandler}
              className="bg-[#A790EA] hover:bg-purple-700"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">REVIEWS</h3>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No Reviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
