import React from "react";
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";

import { FiWind } from "react-icons/fi";
import { WiSolarEclipse } from "react-icons/wi";
import { ImStatsDots } from "react-icons/im";
import { GiWindTurbine } from "react-icons/gi";
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai";
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";

const SideBar = () => {
  const {
    collapseSidebar,
    toggleSidebar,
    collapsed,
    toggled,
    broken,
    rtl,
  } = useProSidebar();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        position: "absolute",
        zIndex: 3,
      }}
      className="mt-3 "
    >
      <Sidebar>
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
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>Weather Data Collapse</button>
      </main>
    </div>
  );
};

export default SideBar;
