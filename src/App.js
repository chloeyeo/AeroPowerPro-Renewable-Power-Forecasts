import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/users";
import {
  Home,
  About,
  Login,
  ErrorPage,
  Contactus /*, PostRequest */,
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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Users></Users>
    </div>
  );
}

export default App;
