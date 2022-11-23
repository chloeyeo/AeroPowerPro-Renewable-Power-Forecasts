import React, { useState } from "react";
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";

import { AiOutlineSearch } from "react-icons/ai";
import { FiWind } from "react-icons/fi";
import { WiSolarEclipse } from "react-icons/wi";
import { ImStatsDots } from "react-icons/im";
import { GiWindTurbine } from "react-icons/gi";
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai";
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SideBar = ({ center, setCenter, areaSize, setAreaSize }) => {
  const {
    collapseSidebar,
    toggleSidebar,
    collapsed,
    toggled,
    broken,
    rtl,
  } = useProSidebar();
  const [inputCoords, setInputCoords] = useState(center || "");
  const [inputSize, setInputSize] = useState(areaSize || 0.1);
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        position: "absolute",
        zIndex: 3,
      }}
    >
      <Sidebar>
        <button onClick={() => collapseSidebar()}>Collapse</button>
        <Menu>
          <SubMenu label="Wind" icon={<FiWind />}>
            <MenuItem icon={<TfiLayoutWidthDefaultAlt />}>
              {" "}
              Capacity (kW){" "}
            </MenuItem>
            <MenuItem icon={<AiOutlineColumnHeight />}>
              {" "}
              Hub Height (m){" "}
            </MenuItem>
            <MenuItem icon={<GiWindTurbine />}> Turbine Mode </MenuItem>
          </SubMenu>
          <MenuItem icon={<WiSolarEclipse />}> Solar </MenuItem>
          <MenuItem icon={<ImStatsDots />}> Weather Forecast </MenuItem>
          <SubMenu label="Search" icon={<AiOutlineSearch />}>
            <p>Latitude</p>
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
            <p>Longitude</p>
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
            <p>Highlighted Area Size</p>
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
              id="button-addon2"
              onClick={() => {
                setCenter([
                  parseFloat(inputCoords[0]),
                  parseFloat(inputCoords[1]),
                ]);
                setAreaSize(parseFloat(inputSize));
              }}
            >
              Search
            </Button>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
