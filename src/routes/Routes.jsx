import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import AllProperties from "../Pages/AllProperties";
import AddProperty from "../Pages/AddProperty";
import MyProperties from "../Pages/MyProperties";
import MyRatings from "../Pages/MyRatings";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Components/PropertyDetails";
import UpdateProperty from "../Pages/UpdateProperty";
import Terms from "../Components/Terms";

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
        path: "/add-property",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-properties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "/terms",
        element: <Terms />,
      },

      {
        path: "/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://home-nest-server-rho.vercel.app/allPropertyRatings"),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
