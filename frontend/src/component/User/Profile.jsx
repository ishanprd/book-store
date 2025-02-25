import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">My Profile</h1>
              
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                {/* Left Column - Avatar and Edit Profile */}
                <div className="w-full lg:w-1/3 flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#A790EA] shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img 
                        src={user.avatar.url} 
                        alt={user.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 border-2 border-[#A790EA] opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Link to="/me/update" className="text-[#A790EA] text-xs font-medium">
                        Change Photo
                      </Link>
                    </div>
                  </div>
                  
                  <Link 
                    to="/me/update"
                    className="mt-8 px-6 py-3 bg-[#A790EA] hover:bg-[#8F75D1] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center w-full max-w-xs"
                  >
                    Edit Profile
                  </Link>
                </div>
                
                {/* Right Column - User Information */}
                <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Full Name</h4>
                      <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Email Address</h4>
                      <p className="text-xl font-semibold text-gray-800">{user.email}</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Joined On</h4>
                      <p className="text-xl font-semibold text-gray-800">{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Member Status</h4>
                      <p className="text-xl font-semibold text-gray-800">Active</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <Link 
                      to="/orders" 
                      className="bg-gray-800 hover:bg-black text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
                    >
                      <span>My Orders</span>
                    </Link>
                    <Link 
                      to="/password/update" 
                      className="bg-gray-800 hover:bg-black text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
                    >
                      <span>Change Password</span>
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;