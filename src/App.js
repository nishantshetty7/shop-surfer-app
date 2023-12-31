import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Login from "./components/Login";
import Register from "./components/Register";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import VerifyUser from "./components/VerifyUser";
import ProductDetail from "./components/ProductDetail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  const oAuthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={oAuthClientId}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<VerifyUser />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="checkout" element={<Checkout />} />
            </Route>
            <Route path="/*" element={<MainLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/category/:slug" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />

          <Route element={<RequireAuth />}>
            <Route path="confirmation" element={<Confirmation />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
