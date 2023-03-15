import React from "react";

const FavouriteTurbine = ({
  cookies,
  loggedInUser,
  userObj,
  powerCurveData,
  setPowerCurveData,
  turbineModels,
}) => (
  <>
    <button
      onClick={() => {
        cookies.set(loggedInUser, {
          ...userObj,
          favModel: powerCurveData.turbineModel,
        });
        setPowerCurveData({
          ...powerCurveData,
        });
      }}
    >
      Set Favourite
    </button>
    <button
      onClick={() =>
        setPowerCurveData({
          ...powerCurveData,
          turbineModel: userObj.favModel,
          tableData: turbineModels[userObj.favModel].power_curve,
        })
      }
    >
      Use Favourite
    </button>
    Current Favorite:
    {userObj.favModel}
  </>
);

export default FavouriteTurbine;
