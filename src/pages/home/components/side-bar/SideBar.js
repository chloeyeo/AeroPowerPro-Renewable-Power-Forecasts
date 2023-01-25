import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import moment from "moment";
import axios from "axios";
import { AiOutlineSearch, AiOutlineColumnHeight } from "react-icons/ai";
import { FiWind } from "react-icons/fi";
import { WiSolarEclipse } from "react-icons/wi";
import { ImStatsDots } from "react-icons/im";
import { GiWindTurbine } from "react-icons/gi";
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./styles.css";

const SideBar = ({
  powerCurveData,
  setPowerCurveData,
  center,
  setCenter,
  areaSize,
  setAreaSize,
}) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [inputCoords, setInputCoords] = useState(center || "");
  const [inputSize, setInputSize] = useState(areaSize || 0.25);
  const [isShown, setIsShown] = useState(false);
  const data = [
    { name: "A", uv: 400, pv: 10000, amt: 10000 },
    { name: "B", uv: 300, pv: 2400, amt: 2400 },
    { name: "C", uv: 300, pv: 2400, amt: 2400 },
    { name: "D", uv: 200, pv: 2400, amt: 2400 },
  ];
  const updateCoords = () => {
    if (
      inputCoords[1] < 50 ||
      inputCoords[1] > 59 ||
      inputCoords[0] < -7 ||
      inputCoords[0] > 4 ||
      inputSize < 0.25 ||
      inputSize > 5
    ) {
      alert(
        "Invalid input, the correct ranges are:\nLatitude: 50 to 59\nLongitude: -7 to 4\nArea Size: 0.25 to 5"
      );
    } else {
      setCenter([parseFloat(inputCoords[0]), parseFloat(inputCoords[1])]);
      setAreaSize(parseFloat(inputSize));
    }
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            borderRadius: "8px",
            padding: "4px",
            backgroundColor: "white",
          }}
          className="custom-tooltip"
        >
          <p className="label">{`${label} hours - ${payload[0].value.toFixed(
            2
          )} kiloWatts`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          position: "absolute",
          zIndex: 3,
          marginTop: 42,
        }}
      >
        <Sidebar>
          <button
            className="btn btn-secondary"
            styles={{ width: "100%" }}
            onClick={() => collapseSidebar()}
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
          <Menu className="sidebar-wrapper">
            <SubMenu label="Wind Power Forecast" icon={<FiWind />}>
              <div className="p-2">
                <h5>Wind Turbine Model</h5>
                {
                  <select
                    onChange={(event) =>
                      setPowerCurveData({
                        ...powerCurveData,
                        turbineModel: event.target.value,
                        tableData:
                          turbineModels[event.target.value].power_curve,
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
                <h5 className="mt-3">Power Curve Info</h5>

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
                            <input
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
                            tableData: [
                              ...powerCurveData.tableData,
                              ["0", "0"],
                            ],
                          })
                        }
                      >
                        Add Row
                      </button>
                    </tr>
                  </table>
                </div>

                <h5 className="mt-3">Hub Height (m)</h5>

                <input
                  aria-label="hub_height"
                  value={powerCurveData.hubHeight}
                  onChange={(event) =>
                    setPowerCurveData({
                      ...powerCurveData,
                      hubHeight: event.target.value,
                    })
                  }
                />
                <h5 className="mt-3">Number of Turbines</h5>
                <input
                  aria-label="num_of_turbines"
                  value={powerCurveData.numOfTurbines}
                  onChange={(event) =>
                    setPowerCurveData({
                      ...powerCurveData,
                      numOfTurbines: event.target.value,
                    })
                  }
                />
                <button
                  onClick={() => {
                    setIsShown(false);
                    axios({
                      method: "post",
                      url: "http://127.0.0.1:8000/generate_power_forecast/",
                      data: {
                        ...powerCurveData,
                        hubHeight: parseFloat(powerCurveData.hubHeight),
                        numOfTurbines: parseFloat(powerCurveData.numOfTurbines),
                        latitude: center[0],
                        longitude: center[1],
                      },
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then(function (response) {
                        console.log("success!", response.data);
                        setPowerForecast(response.data.power_forecast);
                      })
                      .catch(function (error) {
                        console.log(error);
                        console.log("failed with data: ", powerCurveData);
                      });
                    setIsShown(true);
                  }}
                  className="mt-3"
                  style={{ border: "none" }}
                >
                  <h4>Submit</h4>
                </button>
              </div>
            </SubMenu>
            <SubMenu label="Area Search" icon={<AiOutlineSearch />}>
              <div className="p-3">
                <p>Latitude (50 to 59)</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Latitude"
                    aria-label="Latitude"
                    aria-describedby="basic-addon2"
                    value={inputCoords[1]}
                    onChange={(event) =>
                      setInputCoords([inputCoords[0], event.target.value])
                    }
                  />
                </InputGroup>
                <p>Longitude (-7 to 4)</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Longitude"
                    aria-label="Longitude"
                    aria-describedby="basic-addon2"
                    value={inputCoords[0]}
                    onChange={(event) =>
                      setInputCoords([event.target.value, inputCoords[1]])
                    }
                  />
                </InputGroup>
                <p>Scale of Selected Area(In degrees) (0.25 to 5)</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Area Size"
                    aria-label="Area Size"
                    aria-describedby="basic-addon2"
                    value={inputSize}
                    onChange={(event) => setInputSize(event.target.value)}
                  />
                </InputGroup>
                <Button
                  variant="outline-secondary"
                  className="button-addon2"
                  onClick={updateCoords}
                >
                  Search
                </Button>
              </div>
            </SubMenu>
          </Menu>
        </Sidebar>
        {isShown && (
          <div display="flex">
            <Button
              style={{ float: "right" }}
              variant="outline-secondary"
              className="button-addon2"
              onClick={() => {
                setIsShown(false);
              }}
            >
              X
            </Button>
            <div
              style={{
                backgroundColor: "white",
                width: "700px",
                height: "450px",
                marginTop: "16px",
              }}
              className="linechart-wrapper"
            >
              <LineChart
                width={600}
                height={400}
                style={{
                  float: "right",
                }}
                data={powerForecast.map((pair) => ({
                  time: moment(pair[0]).diff(moment(), "hours"),
                  power: pair[1],
                }))}
                background="#fff"
              >
                <Line
                  dot={false}
                  type="monotone"
                  dataKey="power"
                  stroke="#8884d8"
                />
                <CartesianGrid stroke="#ccc" unit="kW" strokeDasharray="5 5" />
                <XAxis
                  dataKey="time"
                  unit="h"
                  ticks={[24, 48, 72, 96, 120, 144]}
                />
                <YAxis type="number" unit="kW" />
                <Tooltip content={CustomTooltip} />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
