import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { Check, Text, FileText, Archive, Pencil, DollarSign } from "lucide-react";

const NewProduct = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [descreption, setDescreption] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("descreption", descreption);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

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
      <MetaData title="Create Product" />
      <div className="flex">
        <SideBar />
        <div className="w-full min-h-screen bg-gray-100 border-l border-gray-200">
          <div className="flex flex-col items-center justify-center p-6 md:p-8">
            <form
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1 className="text-2xl font-medium text-center text-gray-800">Create Product</h1>

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
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <textarea
                  placeholder="Product descreption"
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
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A790EA] focus:border-transparent"
                />
              </div>

              <div className="w-full">
                <label 
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <span>Choose Product Images</span>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-2 w-full max-h-24 overflow-auto">
                {imagesPreview.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt="Product Preview" 
                    className="w-12 h-12 object-cover rounded-md"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded-md focus:outline-none ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#A790EA] hover:bg-[#8A70D6] transition-colors"
                }`}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;