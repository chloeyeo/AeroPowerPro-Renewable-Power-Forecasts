import React from "react";

const SidebarHeader = ({ showWindFarms, collapsed, collapseSidebar }) => (
  <>
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
  </>
);

export default SidebarHeader;
