import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, About, Signup } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
