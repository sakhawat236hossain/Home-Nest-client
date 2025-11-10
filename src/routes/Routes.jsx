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


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch("http://localhost:8000/latestProperty").then((res) =>
            res.json()
          ),
      },

      {
        path: "/properties",
        element: <AllProperties />,
        loader: () => fetch("http://localhost:8000/allProperties"),
      },
      {
        path: "/PropertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:8000/singleProperty/${params.id}`),
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
        path: "/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
