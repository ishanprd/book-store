import React, { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/Footer/Footer.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import webFont from 'webfontloader';
import ProudctDetails from './component/Product/ProductDetails.jsx';
import Products from './component/Product/Products.jsx';
import Search from "./component/Product/Search.jsx";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import Profile from './component/User/Profile.jsx';
import UpdateProfile from './component/User/UpdateProfile.jsx';
import UpdatePassword from './component/User/UpdatePassword.jsx';
import Shipping from './component/Cart/Shipping.jsx';
import ConfirmOrder from './component/Cart/ConfirmOrder.jsx';
import Payment from './component/Cart/Payment.jsx';
import Cart from './component/Cart/Cart.jsx';
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess.jsx';
import MyOrders from './component/Order/MyOrders.jsx';
import OrderDetails from './component/Order/OrderDetails.jsx';
import Dashboard from "./component/admin/Dashboard.jsx";
import ProductList from './component/admin/ProductList.jsx';
import NewProduct from './component/admin/NewProduct.jsx';
import UpdateProduct from "./component/admin/UpdateProduct.jsx";
import OrderList from "./component/admin/OrderList.jsx";
import ProcessOrder from "./component/admin/ProcessOrder.jsx";
import UsersList from "./component/admin/UsersList.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";
import About from "./component/layout/About/About.jsx";
import UpdateUser from "./component/admin/UpdateUser.jsx";
import ProductReviews from "./component/admin/ProductReviews.jsx";
import LoginSignUp from "./component/User/LoginSignUp";
import Home from "./component/Home/Home";

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("pk_test_51R03qsPPRKbNwCps7s64J4FxlBnY9CLsFpsDKFabS55heXcZHfafxvdocYCTePiXhq6VLKyOZqBegYkecnK9N1VF00RVf9Gl22");

  async function getStripeApiKey() {
    const { data } = await axios.get('api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }

  function PaymentPlaceholder({ stripeApiKey }) {
    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    );
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    isAuthenticated && getStripeApiKey();
}, []);

  return (
    <Router>
      
      <div className="flex flex-col min-h-screen">
        <Header />        
        <main className="flex-grow">
          <Routes>
            {isAuthenticated && (
              <Route 
                path="/login/process/payment" 
                element={<PaymentPlaceholder stripeApiKey={stripeApiKey} />} 
              />
            )}
            <Route path="/" element={<Home />} />
            <Route exact path="/contact" Component={Contact} />
            <Route exact path="/about" Component={About} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProudctDetails />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
            {isAuthenticated && <Route path="/account" element={<Profile />} />}
            {isAuthenticated && <Route path="/me/update" element={<UpdateProfile />} />}
            {isAuthenticated && <Route path="/password/update" element={<UpdatePassword />} />}
            <Route path="/cart" element={<Cart />} />
            {isAuthenticated && <Route path="/login/shipping" element={<Shipping />} />}
            {isAuthenticated && <Route path="/login/order/confirm" element={<ConfirmOrder />} />}
            {isAuthenticated && <Route exact path='/success' Component={OrderSuccess}/>}
            {isAuthenticated && <Route exact path='/orders' Component={MyOrders}/>}
            {isAuthenticated && <Route exact path='/order/:id' Component={OrderDetails}/>}
          </Routes>

          {isAuthenticated && (
            <>
              <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" Component={Dashboard} />
              <ProtectedRoute isAdmin={true} exact path="/admin/products" Component={ProductList} />
              <ProtectedRoute isAdmin={true} exact path="/admin/product" Component={NewProduct} />
              <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" Component={UpdateProduct} />
              <ProtectedRoute isAdmin={true} exact path="/admin/orders" Component={OrderList} />
              <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" Component={ProcessOrder} />
              <ProtectedRoute isAdmin={true} exact path="/admin/users" Component={UsersList} />
              <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" Component={UpdateUser} />
              <ProtectedRoute isAdmin={true} exact path="/admin/reviews" Component={ProductReviews} />
            </>
          )}
        </main>
        <Footer />
      </div> 
    </Router>
  );
}

export default App;