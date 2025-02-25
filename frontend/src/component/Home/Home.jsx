import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./ProductCard.jsx";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, toast]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Book Store" />

          <div 
            className="relative h-[100vmin] flex flex-col items-center justify-center text-center text-white bg-no-repeat bg-center bg-cover"
            
          >
            <div 
              className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover"
              style={{ 
                backgroundImage: "url('../../images/cover.jpg')",
                filter: "brightness(0.5)",
                zIndex: "-1"
              }}
            ></div>
            <p className="font-light text-[1.4vmax] font-['Lucida_Sans']">Welcome to Ecommerce</p>
            <h1 className="my-[5vmax] font-semibold text-[50px] font-['Roboto']">FIND AMAZING BOOKS BELOW</h1>

            <a href="#container">
              <button className="mb-[5vmax] cursor-pointer border border-white rounded-none py-[1vmax] px-[1vmax] w-[9vmax] font-medium text-[1vmax] font-['Roboto'] transition-all duration-500 hover:bg-transparent hover:text-white">
                Scroll <CgMouse className="inline animate-bounce" />
              </button>
            </a>
            
            <div className="absolute top-0 left-0 w-full h-full bg-white" style={{
              clipPath: "polygon(100% 68%, 0 100%, 100% 100%)",
              zIndex: "-1"
            }}></div>
          </div>

          <h2 className="text-center font-['Roboto'] text-[1.4vmax] border-b border-[rgba(21,21,21,0.5)] w-[20vmax] py-[1vmax] my-[5vmax] mx-auto text-[rgba(0,0,0,0.7)]">
            Featured Products
          </h2>

          <div className="flex flex-wrap justify-center mx-auto my-[2vmax] w-[80vw] max-w-full" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;