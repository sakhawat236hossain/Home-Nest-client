import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/AuthenticationbPges/Login/Login";
import Register from "../Pages/AuthenticationbPges/Register/Register";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Components/PropertyDetails";
import UpdateProperty from "../Pages/UpdateProperty";
import Terms from "../Components/Terms";
import AddProperty from "../Dashboard/Seller/AddProperty/AddProperty";
import DashboardLayout from "../layout/DashboardLayout";
import Profiles from "../Dashboard/Profiles/Profiles";
import MyAddedProperties from "../Dashboard/Seller/MyAddedProperties/MyAddedProperties";
import MyRatings from "../Dashboard/Users/MyRatings/MyRatings";
import AllProperties from "../Pages/publicPages/AllProperties/AllProperties";
import MyBookingProperty from "../Dashboard/Users/MyBookingProperty/MyBookingProperty";
import ManageProperties from "../Dashboard/Admin/ManageProperties/ManageProperties";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch("https://home-nest-server-rho.vercel.app/latestProperty").then(
            (res) => res.json()
          ),
      },

      {
        path: "/properties",
        element: <AllProperties />,
        loader: () =>
          fetch("https://home-nest-server-rho.vercel.app/allProperties"),
      },
      {
        path: "/PropertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://home-nest-server-rho.vercel.app/singleProperty/${params.id}`
          ),
      },
      {
        path: "/update-property/:id",
        element: (
          <PrivateRoute>
            <UpdateProperty></UpdateProperty>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://home-nest-server-rho.vercel.app/singleProperty/${params.id}`
          ),
      },

      {
        path: "/terms",
        element: <Terms />,
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profiles />,
      },
      {
        path: "add-property",
        element: <AddProperty />,
      },

      {
        path: "my-addedProperties",
        element: (
          <PrivateRoute>
            <MyAddedProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://home-nest-server-rho.vercel.app/allPropertyRatings"),
      },
      {
        path:"my-booking",
        element: (
          <PrivateRoute>
            <MyBookingProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "manageProperties",
        element: <ManageProperties></ManageProperties>
      }
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
