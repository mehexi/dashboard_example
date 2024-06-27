import App from "@/App";
import Login from "@/pages/loging/Loging";
import SignUp from "@/pages/signUp/SignUp";
import { createBrowserRouter, redirect } from "react-router-dom";
import PrivetRoutes from "./PrivetRoutes";
import Products from "@/pages/products/Products";
import ProductsAdd from "@/pages/products/ProductsAdd";
import axiosInstance from "@/axios/AxiosIntence";
import ProductsEdit from "@/pages/products/ProductsEdit";
import User from "@/pages/user/User";
import UserView from "@/pages/user/userUi/UserView";
import CurrentUser from "@/pages/user/userUi/CurrentUser";
import SelectedUser from "@/pages/user/SelectedUser";
import SelectedProducts from "@/pages/products/SelectedProducts";
import Order from "@/pages/order/Order";
import Store from "@/pages/store/Store";
import SelectedProduct from "@/pages/store/SelectedProduct";
import Checkout from "@/pages/checkout/Checkout";
import { getFromCart } from "@/utility/addToCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Store/>
      },
      {
        path: '/:id',
        element: <SelectedProduct />,
        loader: ({params}) => axiosInstance(`/client/products/${params.id}`)
      }
    ]
  },
  {
    path: '/checkout',
    element: <App />,
    children: [
      {
        path: '',
        element: <Checkout />,
        loader: getFromCart
      }
    ]
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
        element: <Order/>,
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
        element: <Products />,
      },
      {
        path: ':id',
        element: <SelectedProducts />,
        loader: ({params}) => axiosInstance(`/client/products/${params.id}`)
      },
      {
        path: "add",
        element: <ProductsAdd />,
      },
      {
        path: "edit/:id",
        element: <ProductsEdit />,
        loader: ({ params }) => axiosInstance(`/client/products/${params.id}`),
      },
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
        element: <User />,
        children: [
          {
            path: "",
            element: <UserView />,
          },
          {
            path: ":id",
            element: <SelectedUser />,
            loader: async ({ params }) => {
              const response = await axiosInstance.get(
                `/general/users/${params.id}`
              );
              return response.data;
            },
          },
        ],
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
