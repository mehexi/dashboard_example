import App from "@/App";
import Login from "@/pages/loging/Loging";
import SignUp from "@/pages/signUp/SignUp";
import { createBrowserRouter, redirect } from "react-router-dom";
import PrivetRoutes from "./PrivetRoutes";
import Products from "@/pages/products/Products";
import ProductsAdd from "@/pages/products/ProductsAdd";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        {" "}
        <App />
      </PrivetRoutes>
    ),
    children: [
      {
        path: "",
        element: <h1>dashboard</h1>,
      },
      {
        path: "add",
        element: <h1>add</h1>,
      },
    ],
  },
  {
    path: "order",
    element: (
      <PrivetRoutes>
        <App />
      </PrivetRoutes>
    ),
    children: [
      {
        path: "",
        element: <h1>order</h1>,
      },
    ],
  },
  {
    path: "products",
    element: (
      <PrivetRoutes>
        <App />
      </PrivetRoutes>
    ),
    children: [
      {
        path: "",
        element: <Products/>,
      },
      {
        path: 'add',
        element: <ProductsAdd/>
      }
    ],
  },
  {
    path: "customers",
    element: (
      <PrivetRoutes>
        <App />
      </PrivetRoutes>
    ),
    children: [
      {
        path: "",
        element: <h1>customer</h1>,
      },
    ],
  },
  {
    path: "analytics",
    element: (
      <PrivetRoutes>
        <App />
      </PrivetRoutes>
    ),
    children: [
      {
        path: "",
        element: <h1>analytics</h1>,
      },
    ],
  },
]);

export default router;
