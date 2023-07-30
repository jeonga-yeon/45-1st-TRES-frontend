import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './components/Container/Container';
import Main from './pages/Main/Main';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import IsLogin from './pages/Login/component/IsLogin';
import Empty from './pages/Empty/Empty';
import ScrollToTop from './components/ScrollToTop';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Container />}>
          <Route path="/" element={<Main />} />
          <Route path="/product-list/:id" element={<ProductList />} />
          <Route path="/products/:foodid" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payments/checkout" element={<Payment />} />
        </Route>
        <Route path="/email-verification" element={<IsLogin />} />
        <Route path="/login" element={<IsLogin />} />
        <Route path="/join" element={<IsLogin />} />
        <Route path="*" element={<Empty />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
