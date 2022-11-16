import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< src/App.js
import { Home, About, Login, ErrorPage, Contactus } from "./pages";
=======
import { Home, About, Login, ErrorPage } from "./pages";
>>>>>>> src/App.js

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
]);

const App = () => <RouterProvider router={router} />;

export default App;
