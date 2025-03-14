import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import MetaData from "../layout/MetaData";
import { Edit, Trash2 } from "lucide-react";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, navigate, isDeleted, message]);

  return (
    <>
      <MetaData title="ALL USERS - Admin" />
      <div className="flex">
        <SideBar />
        <div className="w-full box-border bg-white border-l border-l-black/[0.158] flex flex-col h-screen">
          <h1 className="font-normal text-3xl py-2 box-border text-black/60 transition-all duration-500 m-8 text-center">
            ALL USERS
          </h1>
          
          <div className="px-4 w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#A790EA]">
                <TableRow>
                  <TableHead className="text-white font-medium">User ID</TableHead>
                  <TableHead className="text-white font-medium">Email</TableHead>
                  <TableHead className="text-white font-medium">Name</TableHead>
                  <TableHead className="text-white font-medium">Role</TableHead>
                  <TableHead className="text-white font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-light text-black/70">{user._id}</TableCell>
                    <TableCell className="font-light text-black/70">{user.email}</TableCell>
                    <TableCell className="font-light text-black/70">{user.name}</TableCell>
                    <TableCell className={`font-light ${
                      user.role === "admin" ? "text-green-600" : "text-red-600"
                    }`}>
                      {user.role}
                    </TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <Link to={`/admin/user/${user._id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-black/50 hover:text-[#A790EA] hover:bg-[#A790EA]/10"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-black/50 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deleteUserHandler(user._id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;