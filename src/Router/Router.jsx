import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashbord from "../Layout/Dashbord";
import Profile from "../Pages/Dashbord/Profile/Profile";
import AddedPackage from "../Pages/Dashbord/AddedPackage/AddedPackage";
import Users from "../Pages/Dashbord/Users/Users";
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import MyTour from "../Pages/Dashbord/MyTour/MyTour";
import UserProfileGuide from "../Pages/UserProfileGuide/UserProfileGuide";
import MyWishlist from "../Pages/Dashbord/MyWishlist/MyWishlist";
import MyBooking from "../Pages/Dashbord/MyBooking/MyBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/PackageDetails/:_id',
        element:<PrivetRoute><PackageDetails></PackageDetails></PrivetRoute>
      },
      {
        path: '/userGuidProfile/:_id',
        element: <PrivetRoute><UserProfileGuide></UserProfileGuide></PrivetRoute>
      }
    ],
  },
  {
    path:'/dashbord',
    element: <PrivetRoute><Dashbord></Dashbord></PrivetRoute>,
    children:[
      {
        path: '/dashbord/profile',
        element: <Profile></Profile>
      },
      {
        path: '/dashbord/addedPackage',
        element: <AdminRoute><AddedPackage></AddedPackage></AdminRoute>
      },
      {
        path: '/dashbord/users',
        element: <AdminRoute><Users></Users></AdminRoute>
      },
      {
        path: '/dashbord/MyTour',
        element: <MyTour></MyTour>
      },
      {
        path: '/dashbord/wishlist',
        element: <MyWishlist></MyWishlist>
      },
      {
        path: '/dashbord/myBooking',
        element: <MyBooking></MyBooking>
      }
    ]
  }
]);

export default router;
