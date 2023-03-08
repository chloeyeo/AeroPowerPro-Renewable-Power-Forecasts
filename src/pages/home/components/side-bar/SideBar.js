import React, { useState, useEffect } from "react";
import { Sidebar, SubMenu, Menu, useProSidebar } from "react-pro-sidebar";
import { FiWind } from "react-icons/fi";

import {
  ForecastGraph,
  PowerCurveTable,
  TurbineModelSelect,
  InputsAndSubmit,
  SidebarHeader,
  HistoricSpeedsGraph,
} from "./components";
import { geoLocReq, forecastReq, getHistoricWindSpeedsReq } from "./utils";
import withInputFieldProps from "./withInputFieldProps";
import "./styles.css";
import { Cookies } from "react-cookie";

const SideBar = ({
  powerCurveData,
  setPowerCurveData,
  center,
  setCenter,
  showWindFarms,
  view,
  inputFieldProps,
}) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [isShown, setIsShown] = useState(false);
  const [showHistoric, setShowHistoric] = useState(false);
  const [turbineModels, setTurbineModels] = useState({});
  const [powerForecast, setPowerForecast] = useState([]);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [historicWindSpeeds, setHistoricWindSpeeds] = useState([]);
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("userIn") === "true";

  useEffect(() => geoLocReq(setTurbineModels), []);

  return (
    <div style={{ zIndex: 3 }} className="sidebar">
      <Sidebar>
        <SidebarHeader
          view={view}
          collapsed={collapsed}
          collapseSidebar={() => collapseSidebar()}
        />
        <Menu>
          <SubMenu label="Wind Power Forecast" icon={<FiWind />}>
            <TurbineModelSelect
              powerCurveData={powerCurveData}
              setPowerCurveData={setPowerCurveData}
              turbineModels={turbineModels}
            />
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    const userObj = cookies.get(cookies.get("LoggedInUser"));
                    cookies.set(cookies.get("LoggedInUser"), {
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
                  onClick={() => {
                    const favModel = cookies.get(
                      cookies.get("LoggedInUser")
                    ).favModel;
                    setPowerCurveData({
                      ...powerCurveData,
                      turbineModel: favModel,
                      tableData: turbineModels[favModel].power_curve,
                    });
                  }}
                >
                  Use Favourite
                </button>
                Current Favorite:
                {cookies.get(cookies.get("LoggedInUser")).favModel}
              </>
            )}

            <PowerCurveTable
              powerCurveData={powerCurveData}
              setPowerCurveData={setPowerCurveData}
            />

            <InputsAndSubmit
              inputFieldProps={inputFieldProps}
              onSubmit={() => {
                setIsShown(false);
                forecastReq(
                  powerCurveData,
                  center,
                  setPowerForecast,
                  setIsShown
                );
              }}
            />
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    const userObj = cookies.get(cookies.get("LoggedInUser"));
                    cookies.set(cookies.get("LoggedInUser"), {
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
                    const favLong = cookies.get(
                      cookies.get("LoggedInUser")
                    ).favLong;
                    const favLat = cookies.get(
                      cookies.get("LoggedInUser")
                    ).favLat;
                    console.log(favLat, favLong);
                    setCenter([favLong, favLat]);
                  }}
                >
                  Use Favourite
                </button>
                Current Favorite:
                {cookies.get(cookies.get("LoggedInUser")).favLat},
                {cookies.get(cookies.get("LoggedInUser")).favLong}
              </>
            )}
          </SubMenu>
          <SubMenu label="Historic Wind Speeds">
            <div>
              <div>Start Date</div>
              <input
                type="date"
                value={dates.startDate}
                onChange={(event) =>
                  setDates({ ...dates, startDate: event.target.value })
                }
                min="2021-06-31"
                max="2023-06-31"
              ></input>
              <div>End Date</div>
              <input
                type="date"
                value={dates.endDate}
                onChange={(event) =>
                  setDates({ ...dates, endDate: event.target.value })
                }
                min="2021-06-31"
                max="2023-06-31"
              ></input>
              <div>
                <button
                  onClick={() => {
                    getHistoricWindSpeedsReq(
                      setHistoricWindSpeeds,
                      dates,
                      center
                    );
                    setShowHistoric(true);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </SubMenu>
        </Menu>
      </Sidebar>

      {showHistoric && (
        <HistoricSpeedsGraph
          setShowHistoric={setShowHistoric}
          historicWindSpeeds={historicWindSpeeds}
        />
      )}

      {isShown && (
        <ForecastGraph setIsShown={setIsShown} powerForecast={powerForecast} />
      )}
    </div>
  );
};

export default withInputFieldProps(SideBar);
