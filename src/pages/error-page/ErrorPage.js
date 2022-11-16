import React from "react";
import { useRouteError } from "react-router-dom";
import { NavBar } from "../../components";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <NavBar />
      <div className="text-center">
        <h1 className="mt-5 display-1">{error.status}</h1>
        <h1 className="mt-5 display-3">{error.statusText || error.message}</h1>
        {error.status === 404 && (
          <h3 className="mt-5 display-5">
            The page you are looking for doesn’t exist. <br /> Go back or start
            afresh at sitename.com
          </h3>
        )}
      </div>
    </>
  );
};

export default ErrorPage;
