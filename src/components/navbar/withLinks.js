import React, { useState } from "react";
import { Cookies } from "react-cookie";

const withLinks = (Component) => (props) => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies.get("LoggedIn") === "true"
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
              cookies.set("LoggedIn", false);
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
