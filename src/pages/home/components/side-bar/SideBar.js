import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Sidebar, SubMenu, Menu, useProSidebar } from "react-pro-sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import { FiWind } from "react-icons/fi";

import { ForecastGraph } from "./components";
import "./styles.css";

const SideBar = ({
  powerCurveData,
  setPowerCurveData,
  center,
  setCenter,
  areaSize,
  setAreaSize,
  showWindFarms,
}) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [isShown, setIsShown] = useState(false);
  const updateCoords = () => {
    setCenter([parseFloat(center[0]), parseFloat(center[1])]);
    setAreaSize(parseFloat(areaSize));
  };

  const [turbineModels, setTurbineModels] = useState({});
  const [powerForecast, setPowerForecast] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/generic_wind_turbines/",
    })
      .then(function (response) {
        setTurbineModels(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
                          <input
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

              <div className="mt-2">Hub Height (m)</div>

              <Form.Control
                placeholder="hub height"
                aria-label="hub_height"
                defaultValue={powerCurveData.hubHeight}
                onBlur={(event) =>
                  parseFloat(event.target.value) >= 0
                    ? setPowerCurveData({
                        ...powerCurveData,
                        hubHeight: event.target.value,
                      })
                    : (event.target.value = "")
                }
              />

              <div className="mt-2">Number of Turbines</div>
              <Form.Control
                placeholder="num of turbines"
                aria-label="num_of_turbines"
                defaultValue={powerCurveData.numOfTurbines}
                onBlur={(event) =>
                  parseFloat(event.target.value) >= 0
                    ? setPowerCurveData({
                        ...powerCurveData,
                        numOfTurbines: event.target.value,
                      })
                    : (event.target.value = "")
                }
              />

              <button
                onClick={() => {
                  setIsShown(false);
                  axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/generate_power_forecast/",
                    data: {
                      tableData: powerCurveData.tableData.map((pair) => [
                        parseFloat(pair[0]),
                        parseFloat(pair[1]),
                      ]),
                      hubHeight: parseFloat(powerCurveData.hubHeight),
                      numOfTurbines: parseFloat(powerCurveData.numOfTurbines),
                      latitude: parseFloat(center[1]),
                      longitude: parseFloat(center[0]),
                    },
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then(function (response) {
                      console.log("success!", response.data);
                      setPowerForecast(response.data.power_forecast);
                      setIsShown(true);
                    })
                    .catch(function (error) {
                      console.log(error);
                      console.log("failed with data: ", {
                        tableData: powerCurveData.tableData.map((pair) => [
                          parseFloat(pair[0]),
                          parseFloat(pair[1]),
                        ]),
                        hubHeight: parseFloat(powerCurveData.hubHeight),
                        numOfTurbines: parseFloat(powerCurveData.numOfTurbines),
                        latitude: parseFloat(center[1]),
                        longitude: parseFloat(center[0]),
                      });
                    });
                }}
                className="mt-2"
                style={{ border: "none" }}
              >
                <h4>Submit</h4>
              </button>
            </div>
          </SubMenu>

          <SubMenu label="Area Search" icon={<AiOutlineSearch />}>
            <div className="p-2">
              <div className="mb-2">Latitude (50 to 59)</div>
              <Form.Control
                placeholder="Latitude"
                aria-label="Latitude"
                aria-describedby="basic-addon2"
                defaultValue={center[1]}
                onBlur={(event) =>
                  parseFloat(event.target.value) >= 50 &&
                  parseFloat(event.target.value) <= 59
                    ? setCenter([center[0], event.target.value])
                    : (event.target.value = "")
                }
              />
              <div className="mt-2 mb-2">Longitude (-7 to 4)</div>

              <Form.Control
                placeholder="Longitude"
                aria-label="Longitude"
                aria-describedby="basic-addon2"
                defaultValue={center[0]}
                onBlur={(event) =>
                  parseFloat(event.target.value) >= -7 &&
                  parseFloat(event.target.value) <= 4
                    ? setCenter([event.target.value, center[1]])
                    : (event.target.value = "")
                }
              />

              <div className="mt-2 mb-2">Area Scale - Degrees (0.25 to 5)</div>
              <Form.Control
                placeholder="Area Size"
                aria-label="Area Size"
                aria-describedby="basic-addon2"
                defaultValue={areaSize}
                onBlur={(event) =>
                  parseFloat(event.target.value) >= 0.25 &&
                  parseFloat(event.target.value) <= 5
                    ? setAreaSize(event.target.value)
                    : (event.target.value = "")
                }
              />
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

export default SideBar;
