import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search Products - BookStore" />
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Find Your Next Favorite Book</h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Discover thousands of books in our collection. Search by title, author, genre or keyword.
          </p>
        </div>
        
        <div className="w-full max-w-2xl">
          <form 
            onSubmit={searchSubmitHandler}
            className="flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden transition-all duration-300"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for books..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full p-4 md:p-5 outline-none text-lg text-gray-700 border-2 border-transparent focus:border-[#A790EA] transition-all duration-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon size={20} className={`transition-all duration-300 ${isFocused || keyword ? 'opacity-0' : 'opacity-100'}`} />
              </div>
            </div>
            <button 
              type="submit" 
              className="bg-[#A790EA] hover:bg-[#8F75D1] text-white font-medium py-4 px-8 transition-all duration-300 text-lg flex-shrink-0"
            >
              Search
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <p className="text-gray-500 mr-2">Popular searches:</p>
            {["Fantasy", "Sci-Fi", "Romance", "Mystery", "Biography"].map((tag) => (
              <span 
                key={tag} 
                onClick={() => {
                  setKeyword(tag);
                  navigate(`/products/${tag}`);
                }}
                className="px-3 py-1 bg-purple-100 text-[#8F75D1] rounded-full cursor-pointer hover:bg-[#A790EA] hover:text-white transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </Fragment>
  );
};

export default Search;