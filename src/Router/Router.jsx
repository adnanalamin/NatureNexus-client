import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashbord from "../Layout/Dashbord";
import Profile from "../Pages/Dashbord/Profile/Profile";
import AddedPackage from "../Pages/Dashbord/AddedPackage/AddedPackage";

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
      }
    ],
  },
  {
    path:'/dashbord',
    element: <Dashbord></Dashbord>,
    children:[
      {
        path: '/dashbord/profile',
        element: <Profile></Profile>
      },
      {
        path: '/dashbord/addedPackage',
        element: <AddedPackage></AddedPackage>
      }
    ]
  }
]);

export default router;
