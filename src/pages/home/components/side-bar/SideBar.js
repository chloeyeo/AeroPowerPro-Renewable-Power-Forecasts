import React, { useState, useEffect } from "react";
import { Sidebar, SubMenu, Menu, useProSidebar } from "react-pro-sidebar";
import { FiWind } from "react-icons/fi";

import {
  ForecastGraph,
  PowerCurveTable,
  TurbineModelSelect,
  InputsAndSubmit,
  SidebarHeader,
} from "./components";
import { geoLocReq, forecastReq } from "./utils";
import withInputFieldProps from "./withInputFieldProps";
import "./styles.css";

const SideBar = ({
  powerCurveData,
  setPowerCurveData,
  center,
  showWindFarms,
  inputFieldProps,
}) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [isShown, setIsShown] = useState(false);
  const [turbineModels, setTurbineModels] = useState({});
  const [powerForecast, setPowerForecast] = useState([]);

  useEffect(() => geoLocReq(setTurbineModels), []);

  return (
    <div className="sidebar">
      <Sidebar>
        <SidebarHeader
          showWindFarms={showWindFarms}
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
          </SubMenu>
        </Menu>
      </Sidebar>

      {isShown && (
        <ForecastGraph setIsShown={setIsShown} powerForecast={powerForecast} />
      )}
    </div>
  );
};

export default withInputFieldProps(SideBar);
