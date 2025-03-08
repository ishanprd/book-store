import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  // Pagination state
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  // Get current page items
  const currentItems = products ? products.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : [];
  const totalPages = products ? Math.ceil(products.length / rowsPerPage) : 0;

  return (
    <>
      <MetaData title="ALL PRODUCTS - Admin" />

      <div className="flex h-screen">
        <SideBar />
        <div className="w-full box-border bg-white border-l border-black/10 flex flex-col h-full">
          <h1 className="text-4xl font-normal text-black/60 p-2 my-8 text-center transition-all duration-500">
            ALL PRODUCTS
          </h1>

          <div className="px-4">
            <Table>
              <TableHeader className="bg-[#A790EA]">
                <TableRow>
                  <TableHead className="text-white font-medium w-1/5">Product ID</TableHead>
                  <TableHead className="text-white font-medium w-2/5">Name</TableHead>
                  <TableHead className="text-white font-medium w-1/6">Stock</TableHead>
                  <TableHead className="text-white font-medium w-1/6">Price</TableHead>
                  <TableHead className="text-white font-medium w-1/6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item._id} className="hover:bg-gray-50">
                    <TableCell className="text-black/70 font-light">{item._id}</TableCell>
                    <TableCell className="text-black/70 font-light">{item.name}</TableCell>
                    <TableCell className="text-black/70 font-light">{item.stock}</TableCell>
                    <TableCell className="text-black/70 font-light">{item.price}</TableCell>
                    <TableCell className="text-black/70 font-light">
                      <div className="flex space-x-2">
                        <Link to={`/admin/product/${item._id}`}>
                          <Pencil 
                            className="h-5 w-5 text-black/50 hover:text-[#A790EA] transition-colors duration-300" 
                          />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteProductHandler(item._id)}
                          className="p-0 h-5"
                        >
                          <Trash2 
                            className="h-5 w-5 text-black/50 hover:text-red-500 transition-colors duration-300" 
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4 mb-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(prev => Math.max(0, prev - 1))}
                        className={page === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <span className="px-2">
                        Page {page + 1} of {totalPages}
                      </span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                        className={page === totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;