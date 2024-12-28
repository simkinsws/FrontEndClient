import React from "react";
import "./SideDetailsBar.scss";
const SideDetailsBar = ({ closeSidebar }) => {
  return (
    <div className="side-details-bar">
      <div className="side-bar-header">
        <button onClick={closeSidebar} className="close-sidebar-btn">
          Close
        </button>{" "}
        {/* Close button */}
      </div>
      Hello IM Side Bar only on panel page
    </div>
  );
};

export default SideDetailsBar;
