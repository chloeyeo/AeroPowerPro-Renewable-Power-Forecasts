import React, { useState } from "react";
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import axios from "axios";
import { AiOutlineSearch, AiOutlineColumnHeight } from "react-icons/ai";
import { FiWind } from "react-icons/fi";
import { WiSolarEclipse } from "react-icons/wi";
import { ImStatsDots } from "react-icons/im";
import { GiWindTurbine } from "react-icons/gi";
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SideBar = ({ center, setCenter, areaSize, setAreaSize }) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [inputCoords, setInputCoords] = useState(center || "");
  const [inputSize, setInputSize] = useState(areaSize || 0.1);
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
      setIsShown(true);
    }
  };
  const [powerCurveData, setPowerCurveData] = useState([[0, 0]]);
  const [hubHeight, setHubHeight] = useState(0);
  const [numOfTurbines, setNumOfTurbines] = useState(0);
  const [turbineModels, setTurbineModels] = useState([
    "E_28_2300",
    "V1.1",
    "V2.2",
  ]);

  return (
    <>
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
            styles={{ width: "100%" }}
            onClick={() => collapseSidebar()}
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
          <Menu>
            <SubMenu label="Wind" icon={<FiWind />}>
              <div className="p-2">
                <h5>Wind Turbine Model</h5>
                <select
                  onChange={(event) => {
                    axios({
                      method: "get",
                      url: "http://127.0.0.1:8000/generic_wind_turbines/",
                    })
                      .then(function (response) {
                        console.log("TEST", response.data);
                        setPowerCurveData(
                          response.data["E_28_2300"].power_curve
                        );
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                  name="turbineModels"
                  id="turbineModels"
                >
                  {turbineModels.map((turbineModel) => (
                    <option key={turbineModel} value={turbineModel}>
                      {turbineModel}
                    </option>
                  ))}
                </select>
                <h5 className="mt-3">Power Curve Info</h5>

                <table className="p-3">
                  <thead>
                    <tr>
                      <td>Wind Speed (m/s)</td>
                      <td>Power (kW)</td>
                    </tr>
                  </thead>
                  <tbody>
                    {powerCurveData.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            aria-label={`row${index}_speed`}
                            style={{ maxWidth: "110px" }}
                            value={row[0]}
                            onChange={(event) => {
                              let temp = powerCurveData.slice();
                              temp[index] = [event.target.value, row[1]];
                              return setPowerCurveData(temp);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            aria-label={`row${index}_power`}
                            style={{ maxWidth: "70px" }}
                            value={row[1]}
                            onChange={(event) => {
                              let temp = powerCurveData.slice();
                              temp[index] = [row[0], event.target.value];
                              return setPowerCurveData(temp);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            style={{ border: "none" }}
                            onClick={() => {
                              let temp = powerCurveData.slice();
                              temp.splice(index, 1);
                              return setPowerCurveData(temp);
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
                        setPowerCurveData([...powerCurveData, ["0", "0"]])
                      }
                    >
                      Add Row
                    </button>
                  </tr>
                </table>

                <h5 className="mt-3">Hub Height (m)</h5>
                <input
                  aria-label="hub_height"
                  value={hubHeight}
                  onChange={(event) => setHubHeight(event.target.value)}
                />
                <h5 className="mt-3">Number of Turbines</h5>
                <input
                  aria-label="num_of_turbines"
                  value={numOfTurbines}
                  onChange={(event) => setNumOfTurbines(event.target.value)}
                />
              </div>
            </SubMenu>
            <SubMenu label="Search" icon={<AiOutlineSearch />}>
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
            <div
              style={{
                height: "300px",
                backgroundColor: "white",
              }}
            >
              <Button
                variant="outline-secondary"
                className="button-addon2"
                onClick={() => {
                  setIsShown((current) => false);
                }}
              >
                X
              </Button>
            </div>
            <div
              style={{
                backgroundColor: "white",
                width: "700px",
                height: "300px",
              }}
            >
              <LineChart width={600} height={300} data={data} background="#fff">
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
