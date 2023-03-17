import React from "react";

const FavouriteCoordinates = ({
  cookies,
  loggedInUser,
  userObj,
  powerCurveData,
  setPowerCurveData,
  center,
  setCenter,
}) => (
  <>
    <button
      onClick={() => {
        cookies.set(loggedInUser, {
          ...userObj,
          favLong: center[0],
          favLat: center[1],
        });
        setPowerCurveData({
          ...powerCurveData,
        });
      }}
    >
      Set Favourite
    </button>
    <button
      onClick={() => {
        const favLong = userObj.favLong;
        const favLat = userObj.favLat;
        setCenter([favLong, favLat]);
      }}
    >
      Use Favourite
    </button>
    Current Favorite:
    {userObj.favLat}, {userObj.favLong}
  </>
);

export default FavouriteCoordinates;
