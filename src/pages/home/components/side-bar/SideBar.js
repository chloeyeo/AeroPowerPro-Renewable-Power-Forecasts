import React, { useState, useEffect } from "react";
import { Sidebar, SubMenu, Menu, useProSidebar } from "react-pro-sidebar";
import { FiWind } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { Cookies } from "react-cookie";

import {
  ForecastGraph,
  PowerCurveTable,
  TurbineModelSelect,
  InputsAndSubmit,
  SidebarHeader,
  HistoricDataGraph,
  DateInputs,
  FavouriteTurbine,
  FavouriteCoordinates,
} from "./components";
import {
  geoLocReq,
  forecastReq,
  getHistoricWindSpeedsReq,
  getHistoricSolarReq,
} from "./utils";

import withInputFieldProps from "./withInputFieldProps";
import "./styles.css";

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
  const [historicData, setHistoricData] = useState([]);
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("userIn") === "true";
  const loggedInUser = cookies.get("LoggedInUser");
  const userObj = cookies.get(loggedInUser);

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
              <FavouriteTurbine
                cookies={cookies}
                loggedInUser={loggedInUser}
                userObj={userObj}
                powerCurveData={powerCurveData}
                setPowerCurveData={setPowerCurveData}
                turbineModels={turbineModels}
              />
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
              <FavouriteCoordinates
                cookies={cookies}
                loggedInUser={loggedInUser}
                userObj={userObj}
                powerCurveData={powerCurveData}
                setPowerCurveData={setPowerCurveData}
                center={center}
                setCenter={setCenter}
              />
            )}
          </SubMenu>
          <SubMenu label="Historic Data" icon={<AiOutlineBarChart />}>
            <DateInputs
              dates={dates}
              setDates={setDates}
              setHistoricData={setHistoricData}
              getHistoricSolarReq={getHistoricSolarReq}
              getHistoricWindSpeedsReq={getHistoricWindSpeedsReq}
              center={center}
              setShowHistoric={setShowHistoric}
            />
          </SubMenu>
        </Menu>
      </Sidebar>

      {showHistoric && (
        <HistoricDataGraph
          setShowHistoric={setShowHistoric}
          historicData={historicData}
        />
      )}

      {isShown && (
        <ForecastGraph setIsShown={setIsShown} powerForecast={powerForecast} />
      )}
    </div>
  );
};

export default withInputFieldProps(SideBar);
