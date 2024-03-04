import {
    createBrowserRouter,
  } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AddItem from "../Pages/Dashboard/AddItem";
import AllUsers from "../Pages/Dashboard/AllUsers";
import ManageItem from "../Pages/Dashboard/ManageItem";
import MyCart from "../Pages/Dashboard/MyCart";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Order from "../Pages/Order/Order";
import OurMenu from "../Pages/OurMenu/OurMenu";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRouter from './PrivateRouter/PrivateRouter';

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/ourMenu',
          element:<OurMenu></OurMenu>
        },
        {
          path:'/order/:category',
          element:<Order></Order>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
      children:[
        {
          path:'/dashboard/mycart',
          element:<MyCart></MyCart>
        },
        {
          path:'/dashboard/allUsers',
          element:<AllUsers></AllUsers>
        },
        {
          path:'/dashboard/additem',
          element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path:'/dashboard/manageitem',
          element:<AdminRoute><ManageItem></ManageItem></AdminRoute>
        }
      ]
    }
  ]);