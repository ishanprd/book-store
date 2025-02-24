import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      toast.error("Product stock limit reached");
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) {
      dispatch(removeItemsFromCart(id));
      toast.success("Item removed from cart");
      return;
    }
    
    const newQty = quantity - 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.success("Item removed from cart");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] p-10">
        <ShoppingCart className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-medium mb-4">No Product in Your Cart</h2>
        <Button asChild className="bg-[#A790EA] hover:bg-[#8e75d9]">
          <Link to="/products">View Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-[4fr_1fr_1fr] bg-[#A790EA] text-white p-3 rounded-t-md">
          <p className="font-light">Product</p>
          <p className="font-light">Quantity</p>
          <p className="font-light text-right">Subtotal</p>
        </div>

        <Card className="border-0 rounded-t-none shadow-sm">
          <CardContent className="p-0">
            {cartItems.map((item) => (
              <div 
                key={item.product} 
                className="grid grid-cols-[4fr_1fr_1fr] border-b last:border-b-0"
              >
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                
                <div className="flex items-center h-32 px-2">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-md"
                      onClick={() => decreaseQuantity(item.product, item.quantity)}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      className="h-8 w-8 text-center border-y outline-none text-sm"
                      value={item.quantity}
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-md"
                      onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-end h-32 px-4">
                  <p className="text-gray-800 font-light">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 mt-6">
          <div></div>
          <div className="flex flex-col">
            <div className="flex justify-between border-t-2 border-[#A790EA] py-4 px-2 mx-4">
              <p className="font-medium">Gross Total</p>
              <p className="font-medium">
                ₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}
              </p>
            </div>
            
            <div className="flex justify-end mx-4">
              <Button 
                onClick={checkoutHandler}
                className="w-1/2 rounded-full bg-[#A790EA] hover:bg-[#8e75d9]"
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;