import React, { useState } from "react";
import { Cookies } from "react-cookie";

const withLinks = (Component) => (props) => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies.get("userIn") === "true"
  );

  const links = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Contact Us",
      link: "/contactus",
    },
    ...(isLoggedIn
      ? [
          {
            text: "Logout",
            link: "/",
            onClick: () => {
              setIsLoggedIn(false);
              cookies.set("userIn", false);
              cookies.get(cookies.get("LoggedInUser")).loggedIn = false;
              cookies.set("LoggedInUser", null);
              window.location.replace("http://127.0.0.1:3000");
            },
          },
        ]
      : [
          {
            text: "Login",
            link: "/login",
          },
          {
            text: "Register",
            link: "/register",
          },
        ]),
  ];

  return <Component {...props} links={links} />;
};

export default withLinks;
