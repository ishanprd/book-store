import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trash2 } from "lucide-react";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

  return (
    <>
      <MetaData title="ALL REVIEWS - Admin" />

      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 bg-white border-l border-gray-200 min-h-screen">
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-medium text-center text-gray-800">
                ALL REVIEWS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={productReviewsSubmitHandler}
                className="space-y-6"
              >
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    <Star size={16} />
                  </span>
                  <Input
                    type="text"
                    placeholder="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || productId === ""}
                  className="w-full"
                  style={{ backgroundColor: "#A790EA" }}
                >
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {reviews && reviews.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Review ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell className="font-medium">{review._id}</TableCell>
                      <TableCell>{review.name}</TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>
                        <span className={review.rating >= 3 ? "text-green-600" : "text-red-600"}>
                          {review.rating}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => deleteReviewHandler(review._id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center mt-8">
              <h1 className="text-2xl font-medium text-gray-800">No Reviews Found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;