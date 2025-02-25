import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
            <Card className="w-1/4 h-4/5 overflow-hidden bg-white shadow-md md:w-1/2 sm:w-full sm:h-[95vh]">
              <CardHeader>
                <CardTitle className="text-center text-xl text-black/60 font-normal pb-4 border-b border-black/20 w-1/2 mx-auto md:text-2xl sm:text-3xl">
                  Update Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form 
                  className="flex flex-col space-y-6 h-full"
                  onSubmit={updateProfileSubmit}
                  encType="multipart/form-data"
                >
                  <div className="relative w-full">
                    <User className="absolute left-3 top-2.5 text-black/60 h-5 w-5 sm:h-7 sm:w-7" />
                    <Input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 py-2 border border-black/30 rounded font-light sm:text-lg sm:py-4 sm:pl-12"
                    />
                  </div>

                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-2.5 text-black/60 h-5 w-5 sm:h-7 sm:w-7" />
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 py-2 border border-black/30 rounded font-light sm:text-lg sm:py-4 sm:pl-12"
                    />
                  </div>

                  <div className="flex items-center w-full">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar Preview" 
                      className="w-12 h-12 rounded-full mr-4 sm:w-20 sm:h-20"
                    />
                    <Input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                      className="cursor-pointer file:bg-white file:border-0 file:text-black/60 file:font-normal sm:text-lg hover:file:bg-gray-100 file:transition-all file:duration-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#A790EA] hover:bg-[#8e77c7] text-white font-light rounded shadow-md transition-all duration-300 py-2 sm:text-xl sm:py-4"
                  >
                    Update
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;