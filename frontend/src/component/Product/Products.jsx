import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Pagination from "react-js-pagination";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Children",
  "Comics",
  "Religious",
  "Educational",
  "Art",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([100, 5000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const priceHandler = (value) => {
    setPrice(value);
  };

  const ratingsHandler = (value) => {
    setRatings(value[0]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  let count = filteredProductsCount;

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title="PRODUCTS -- ECOMMERCE" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 text-[#A790EA]">
            Products
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Section */}
            <Card className="w-full md:w-1/4 p-4 h-fit">
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <Slider
                    value={price}
                    onValueChange={priceHandler}
                    min={100}
                    max={5000}
                    step={10}
                    className="w-full bg-gray-400 text-lg font-bold"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹{price[0]}</span>
                    <span>₹{price[1]}</span>
                  </div>
                </div>

                <div className="mb-6">
  <h3 className="text-lg font-semibold mb-4">Categories</h3>
  <div className="grid grid-cols-2 gap-2">
    {categories.map((cat) => (
      <Button
        key={cat}
        variant="outline"
        size="sm"
        onClick={() => setCategory(cat === category ? "" : cat)}
        className={`justify-start border rounded px-3 py-1 text-sm transition ${
          category === cat
            ? "bg-blue-900 text-white border-gray-500 hover:bg-gray-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        {cat}
      </Button>
    ))}
  </div>
</div>


                <div>
                  <h3 className="text-lg font-semibold mb-4">Ratings</h3>
                  <Slider
                    value={[ratings]}
                    onValueChange={ratingsHandler}
                    max={5}
                    step={1}
                    className="w-full bg-gray-400"
                  />
                  <div className="text-center text-sm text-gray-600 mt-2">
                    Above {ratings} Stars
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products && products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {resultPerPage < count && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="mx-1 px-3 py-1 border rounded"
                    linkClass="text-[#A790EA] hover:bg-[#A790EA] hover:text-white"
                    activeClass="bg-[#A790EA] text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;