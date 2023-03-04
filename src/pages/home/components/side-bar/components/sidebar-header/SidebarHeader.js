import React from "react";

const SidebarHeader = ({ view, collapsed, collapseSidebar }) => (
  <>
    <button
      className="btn btn-secondary"
      style={{ width: "100%" }}
      onClick={() => collapseSidebar()}
    >
      {collapsed ? "Expand" : "Collapse"}
    </button>
    <h3 style={{ textAlign: "center", fontFamily: "fangsong" }}>{view}</h3>
  </>
);

export default SidebarHeader;
