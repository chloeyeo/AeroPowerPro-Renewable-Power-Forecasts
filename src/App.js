import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, About, Signup, ErrorPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
