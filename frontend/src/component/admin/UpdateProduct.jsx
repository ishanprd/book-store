import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { Check, Text, FileText, Archive, Pencil, DollarSign } from "lucide-react";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [descreption, setDescreption] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Children",
    "Comics",
    "Religious",
    "Educational",
    "Art",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescreption(product.descreption);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      history("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
  
    const myForm = new FormData();
  
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("descreption", descreption);
    myForm.set("category", category);
    myForm.set("stock", stock);
  
    
    console.log("Form data before dispatch:");
    for (let [key, value] of myForm.entries()) {
      console.log(key, ":", value);
    }
    
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="flex">
        <SideBar />
        <div className="w-full min-h-screen bg-gray-100 border-l border-gray-200">
          <div className="flex flex-col items-center justify-center p-6 md:p-8">
            <form
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1 className="text-2xl font-medium text-center text-gray-800">Update Product</h1>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Pencil className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <textarea
                  placeholder="Product Description"
                  value={descreption}
                  onChange={(e) => setDescreption(e.target.value)}
                  rows="2"
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent"
                ></textarea>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Check className="w-5 h-5 text-gray-500" />
                </div>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Archive className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent"
                />
              </div>


              {oldImages && oldImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Current Images:</p>
                  <div className="flex flex-wrap gap-2 w-full max-h-24 overflow-auto">
                    {oldImages.map((image, index) => (
                      <img 
                        key={index} 
                        src={image.url} 
                        alt="Old Product Preview" 
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              {imagesPreview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">New Images:</p>
                  <div className="flex flex-wrap gap-2 w-full max-h-24 overflow-auto">
                    {imagesPreview.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt="New Product Preview" 
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded-md focus:outline-none ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#A790EA] hover:bg-[#8A70D6] transition-colors"
                }`}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;