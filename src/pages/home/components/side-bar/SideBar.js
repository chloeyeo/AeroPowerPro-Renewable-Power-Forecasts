import React, { useState, useEffect } from "react";
import { Sidebar, SubMenu, Menu, useProSidebar } from "react-pro-sidebar";
import { FiWind } from "react-icons/fi";
import { Cookies } from "react-cookie";

import {
  ForecastGraph,
  PowerCurveTable,
  TurbineModelSelect,
  InputsAndSubmit,
  SidebarHeader,
  HistoricSpeedsGraph,
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
  const [solarDates, setSolarDates] = useState({ startDate: "", endDate: "" });
  const [historicWindSpeeds, setHistoricWindSpeeds] = useState([]);
  const [historicSolarEnergies, setHistoricSolarEnergies] = useState([]);
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
          <SubMenu label="Historic Wind Speeds">
            <DateInputs
              dates={dates}
              setDates={setDates}
              onClick={() => {
                getHistoricWindSpeedsReq(setHistoricWindSpeeds, dates, center);
                setShowHistoric(true);
              }}
            />
          </SubMenu>
          <SubMenu label="Historic Solar energy">
            <DateInputs
              dates={solarDates}
              setDates={setSolarDates}
              onClick={() => {
                getHistoricSolarReq(setHistoricSolarEnergies, dates, center);
                setShowHistoric(true);
              }}
            />
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
