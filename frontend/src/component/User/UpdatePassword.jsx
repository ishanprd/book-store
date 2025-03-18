import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { KeyRound, LockOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
            <Card className="w-1/4 h-4/5 overflow-hidden bg-white shadow-md md:w-1/2 sm:w-full sm:h-[95vh]">
              <CardHeader>
                <CardTitle className="text-center text-xl text-black/60 font-normal pb-4 border-b border-black/20 w-1/2 mx-auto md:text-2xl sm:text-3xl">
                  Update Password
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form 
                  className="flex flex-col space-y-8 h-full"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="relative w-full">
                    <KeyRound className="absolute left-3 top-2.5 text-black/60 h-5 w-5 sm:h-7 sm:w-7" />
                    <Input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="pl-10 py-2 border border-black/30 rounded font-light sm:text-lg sm:py-4 sm:pl-12"
                    />
                  </div>

                  <div className="relative w-full">
                    <LockOpen className="absolute left-3 top-2.5 text-black/60 h-5 w-5 sm:h-7 sm:w-7" />
                    <Input
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 py-2 border border-black/30 rounded font-light sm:text-lg sm:py-4 sm:pl-12"
                    />
                  </div>

                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-2.5 text-black/60 h-5 w-5 sm:h-7 sm:w-7" />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 py-2 border border-black/30 rounded font-light sm:text-lg sm:py-4 sm:pl-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#A790EA] hover:bg-[#8e77c7] text-white font-light rounded shadow-md transition-all duration-300 py-2 sm:text-xl sm:py-4"
                  >
                    Change
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

export default UpdatePassword;