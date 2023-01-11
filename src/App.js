import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  About,
  Login,
  ErrorPage,
  Contactus /*, PostRequest */,
  Register,
} from "./pages";
import { ProSidebarProvider } from "react-pro-sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProSidebarProvider>
        <Home />
      </ProSidebarProvider>
    ),
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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
