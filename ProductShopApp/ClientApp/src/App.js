import React, { Suspense, lazy } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import "./custom.css";

// code-splitting only works if we re-exported components as "default"
const ProductList = lazy(() => import("./components/productList"));
const ProductView = lazy(() => import("./components/productView"));
const ProductEdit = lazy(() => import("./components/productEdit"));

export const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout>
      <Route path="/" exact component={ProductList} />
      <Route path="/home" exact component={Home} />
      <Route path="/products" exact component={ProductList} />
      <Route path="/products/:id" exact component={ProductView} />
      <Route path="/products/edit/:id" exact component={ProductEdit} />
    </Layout>
  </Suspense>
);
