import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import PrivetRoutes from "./PrivetRoutes";
import axiosInstance from "@/axios/AxiosIntence";
import { getFromCart } from "@/utility/cartUtils";
import Loading from "@/components/coustomUi/Loading";
import Step2 from "@/pages/checkout/checkoutUi/Step2";
import Step3 from "@/pages/checkout/checkoutUi/Step3";
import Dashboard from "@/pages/dashboard/Dashboard";

// Lazy load components
const Login = lazy(() => import("@/pages/loging/Loging"));
const SignUp = lazy(() => import("@/pages/signUp/SignUp"));
const Products = lazy(() => import("@/pages/products/Products"));
const ProductsAdd = lazy(() => import("@/pages/products/ProductsAdd"));
const ProductsEdit = lazy(() => import("@/pages/products/ProductsEdit"));
const User = lazy(() => import("@/pages/user/User"));
const UserView = lazy(() => import("@/pages/user/userUi/UserView"));
const SelectedUser = lazy(() => import("@/pages/user/SelectedUser"));
const SelectedProducts = lazy(() => import("@/pages/products/SelectedProducts"));
const Order = lazy(() => import("@/pages/order/Order"));
const SingleOrder = lazy(()=> import("@/pages/order/SingleOrder"))
const Store = lazy(() => import("@/pages/store/Store"));
const SelectedProduct = lazy(() => import("@/pages/store/SelectedProduct"));
const Checkout = lazy(() => import("@/pages/checkout/Checkout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Suspense fallback={<Loading />}><Store/></Suspense>
      },
      {
        path: '/:id',
        element: <Suspense fallback={<Loading />}><SelectedProduct /></Suspense>,
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
        element: <Suspense fallback={<Loading />}><Checkout /></Suspense>,
        loader: getFromCart,
        children: [
          {
            path: 'step2',
            element: <Suspense fallback={<Loading />}><Step2/></Suspense>,
          },
          {
            path: 'step3',
            element: <Suspense fallback={<Loading />}><Step3/></Suspense>,
          },
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <Suspense fallback={<Loading />}><Login /></Suspense>,
  },
  {
    path: "/signUp",
    element: <Suspense fallback={<Loading />}><SignUp /></Suspense>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <App />
      </PrivetRoutes>
    ),
    children: [
      {
        path: "",
        element: <Dashboard/>
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
        element: <Suspense fallback={<Loading />}><Order/></Suspense>,
      },
      {
        path: ":id",
        element: <Suspense fallback={<Loading />}><SingleOrder/></Suspense>,
        loader: ({params}) => axiosInstance(`/sales/${params.id}`)
      }
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
        element: <Suspense fallback={<Loading />}><Products /></Suspense>,
      },
      {
        path: ':id',
        element: <Suspense fallback={<Loading />}><SelectedProducts /></Suspense>,
        loader: ({params}) => axiosInstance(`/client/products/${params.id}`)
      },
      {
        path: "add",
        element: <Suspense fallback={<Loading />}><ProductsAdd /></Suspense>,
      },
      {
        path: "edit/:id",
        element: <Suspense fallback={<Loading />}><ProductsEdit /></Suspense>,
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
        element: <Suspense fallback={<Loading />}><User /></Suspense>,
        children: [
          {
            path: "",
            element: <Suspense fallback={<Loading />}><UserView /></Suspense>,
          },
          {
            path: ":id",
            element: <Suspense fallback={<Loading />}><SelectedUser /></Suspense>,
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
