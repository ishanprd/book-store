import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import toast from 'react-hot-toast';
import Loader from "../layout/Loader/Loader";

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import icons from Lucide React
import { Mail, Lock, User, Upload } from "lucide-react";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
          <Card className="w-full max-w-md shadow-lg border-0">
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#A790EA] rounded-none"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#A790EA] rounded-none"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              
              <CardContent className="p-0">
                <TabsContent value="login" className="m-0">
                  <form 
                    onSubmit={loginSubmit} 
                    className="flex flex-col p-6 space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          id="loginEmail"
                          type="email"
                          placeholder="Enter your email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10 h-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          id="loginPassword"
                          type="password"
                          placeholder="Enter your password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 h-10"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#A790EA] hover:bg-[#8a6ad8] text-white h-10"
                    >
                      Login
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="m-0">
                  <form
                    onSubmit={registerSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col p-6 space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                          className="pl-10 h-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          name="email"
                          value={email}
                          onChange={registerDataChange}
                          className="pl-10 h-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          required
                          name="password"
                          value={password}
                          onChange={registerDataChange}
                          className="pl-10 h-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="avatar" className="text-sm font-medium">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#A790EA] flex-shrink-0">
                          <img 
                            src={avatarPreview} 
                            alt="Avatar Preview" 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="relative flex-1">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 h-10 border-dashed"
                            onClick={() => document.getElementById('avatar').click()}
                          >
                            <Upload className="h-4 w-4" />
                            <span>Upload Image</span>
                          </Button>
                          <Input
                            id="avatar"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#A790EA] hover:bg-[#8a6ad8] text-white h-10 mt-4"
                    >
                      Register
                    </Button>
                  </form>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;