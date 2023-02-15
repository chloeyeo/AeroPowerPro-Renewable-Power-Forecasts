import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Sidebar, SubMenu, Menu, useProSidebar } from "react-pro-sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import { FiWind } from "react-icons/fi";

import { ForecastGraph, InputField } from "./components";
import { geoLocReq, forecastReq } from "./utils";
import withInputFieldProps from "./withInputFieldProps";
import "./styles.css";

const SideBar = ({
  powerCurveData,
  setPowerCurveData,
  center,
  setCenter,
  areaSize,
  setAreaSize,
  showWindFarms,
  inputFieldProps,
}) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [isShown, setIsShown] = useState(false);
  const updateCoords = () => {
    setCenter([parseFloat(center[0]), parseFloat(center[1])]);
    setAreaSize(parseFloat(areaSize));
  };

  const [turbineModels, setTurbineModels] = useState({});
  const [powerForecast, setPowerForecast] = useState([]);

  useEffect(() => geoLocReq(setTurbineModels), []);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 3,
      }}
    >
      <Sidebar>
        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={() => collapseSidebar()}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
        <h3 style={{ textAlign: "center", fontFamily: "fangsong" }}>
          {showWindFarms ? "Wind Farms" : "Area Size Map"}
        </h3>
        <Menu closeOnClick className="sidebar-wrapper">
          <SubMenu label="Wind Power Forecast" icon={<FiWind />}>
            <div className="p-2">
              <h5>Wind Turbine Model</h5>
              {
                <select
                  onChange={(event) =>
                    setPowerCurveData({
                      ...powerCurveData,
                      turbineModel: event.target.value,
                      tableData: turbineModels[event.target.value].power_curve,
                    })
                  }
                  name="turbineModels"
                  id="turbineModels"
                >
                  <option value="" selected disabled hidden>
                    {turbineModels &&
                    Object.keys(turbineModels).length === 0 &&
                    Object.getPrototypeOf(turbineModels) === Object.prototype
                      ? "Turbines loading..."
                      : "Choose here"}
                  </option>
                  {Object.keys(turbineModels).map((turbineModel) => (
                    <option key={turbineModel} value={turbineModel}>
                      {turbineModel}
                    </option>
                  ))}
                </select>
              }

              <div className="table-wrapper">
                <table className="p-3">
                  <thead>
                    <tr>
                      <td>Wind Speed (m/s)</td>
                      <td>Power (kW)</td>
                    </tr>
                  </thead>
                  <tbody>
                    {powerCurveData.tableData.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            aria-label={`row${index}_speed`}
                            style={{ maxWidth: "90px" }}
                            value={row[0]}
                            onChange={(event) => {
                              let newTableData =
                                powerCurveData.tableData.slice();
                              newTableData[index] = [
                                event.target.value,
                                row[1],
                              ];
                              return setPowerCurveData({
                                ...powerCurveData,
                                tableData: newTableData,
                              });
                            }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            aria-label={`row${index}_power`}
                            style={{ maxWidth: "60px" }}
                            value={row[1]}
                            onChange={(event) => {
                              let newTableData =
                                powerCurveData.tableData.slice();
                              newTableData[index] = [
                                row[0],
                                event.target.value,
                              ];
                              return setPowerCurveData({
                                ...powerCurveData,
                                tableData: newTableData,
                              });
                            }}
                          />
                        </td>
                        <td>
                          <button
                            style={{ border: "none" }}
                            onClick={() => {
                              let newTableData =
                                powerCurveData.tableData.slice();
                              newTableData.splice(index, 1);
                              return setPowerCurveData({
                                ...powerCurveData,
                                tableData: newTableData,
                              });
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tr>
                    <button
                      style={{ border: "none" }}
                      onClick={() =>
                        setPowerCurveData({
                          ...powerCurveData,
                          tableData: [...powerCurveData.tableData, ["0", "0"]],
                        })
                      }
                    >
                      Add Row
                    </button>
                  </tr>
                </table>
              </div>

              {inputFieldProps
                .slice(0, 2)
                .map(({ title, minVal, maxVal, value, updateFunc }) => (
                  <InputField
                    title={title}
                    minVal={minVal}
                    maxVal={maxVal}
                    value={value}
                    updateFunc={updateFunc}
                  />
                ))}

              <Button
                variant="outline-secondary"
                className="button-addon2 mt-2"
                onClick={() => {
                  setIsShown(false);
                  forecastReq(
                    powerCurveData,
                    center,
                    setPowerForecast,
                    setIsShown
                  );
                }}
              >
                Submit
              </Button>
            </div>
          </SubMenu>

          <SubMenu label="Area Search" icon={<AiOutlineSearch />}>
            <div className="p-2">
              {inputFieldProps
                .slice(2, 5)
                .map(({ title, minVal, maxVal, value, updateFunc }) => (
                  <InputField
                    title={title}
                    minVal={minVal}
                    maxVal={maxVal}
                    value={value}
                    updateFunc={updateFunc}
                  />
                ))}

              <Button
                variant="outline-secondary"
                className="button-addon2 mt-2"
                onClick={updateCoords}
              >
                Search
              </Button>
            </div>
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
