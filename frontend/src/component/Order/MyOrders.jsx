import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import { ExternalLink } from "lucide-react";
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
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  
  // State for pagination
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  // Process orders data for the table
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.reduce((total, item) => total + item.quantity, 0),
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
    
  // Calculate pagination
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <MetaData title={`${user?.name || "User"} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="fixed inset-0 bg-gray-100 overflow-auto p-0 sm:p-8">
          <div className="h-full flex flex-col">
            <div className="bg-[#2c2c2c] mb-4 py-2 px-4 text-white text-center">
              <h1 className="text-lg sm:text-xl font-medium">
                {user?.name || "User"}'s Orders
              </h1>
            </div>
            
            <Card className="flex-grow overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-[#A790EA]">
                    <TableRow>
                      <TableHead className="text-white font-medium">Order ID</TableHead>
                      <TableHead className="text-white font-medium">Status</TableHead>
                      <TableHead className="text-white font-medium">Items Qty</TableHead>
                      <TableHead className="text-white font-medium">Amount</TableHead>
                      <TableHead className="text-white font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRows.length > 0 ? (
                      paginatedRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium break-all">{row.id}</TableCell>
                          <TableCell>
                            <span 
                              className={`${
                                row.status === "Delivered" 
                                  ? "text-green-600" 
                                  : "text-red-600"
                              }`}
                            >
                              {row.status}
                            </span>
                          </TableCell>
                          <TableCell>{row.itemsQty}</TableCell>
                          <TableCell>₹{row.amount}</TableCell>
                          <TableCell>
                            <Link 
                              to={`/order/${row.id}`}
                              className="text-gray-600 hover:text-[#A790EA] transition-colors"
                            >
                              <ExternalLink size={20} />
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalPages > 1 && (
                <div className="p-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(0, page - 1))}
                          className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages).keys()].map((pageNum) => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNum)}
                            isActive={page === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
                          className={page === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;