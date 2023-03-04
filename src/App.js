import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, About, Login, ErrorPage, Contactus, Register } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contactus",
    element: <Contactus />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
