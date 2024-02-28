import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import SideBarItem from "../SideBarItem/SideBarItem";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 950) {
        setIsCollapsed(true);
        setIsScreenSmall(true);
      } else {
        setIsScreenSmall(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={
        isCollapsed
          ? "d-flex flex-column flex-shrink-0 sidebar-collapsed"
          : "d-flex flex-column flex-shrink-0 sidebar"
      }
      style={{
        zIndex: !isCollapsed && isScreenSmall ? 1 : "auto", // z-index ajustado quando a barra lateral está recolhida em telas pequenas
        position: !isCollapsed && isScreenSmall ? "fixed" : "relative",
      }}
    >
      <div className="sidebar-arrow-icon-row" onClick={toggleSidebar}>
        <i
          className={
            isCollapsed
              ? "bi bi-chevron-double-right sidebar-arrow-icon"
              : "bi bi-chevron-double-left sidebar-arrow-icon"
          }
          style={{ color: "gray" }}
        ></i>
      </div>
      <ul className="mb-auto side-bar-items">
        <SideBarItem
          path="/Home"
          iconName="house"
          iconColor="#509aeb"
          isCollapsed={isCollapsed}
        >
          Home
        </SideBarItem>
        <SideBarItem
          path="/Devices"
          iconName="motherboard"
          iconColor="#75bb2c"
          isCollapsed={isCollapsed}
        >
          Devices
        </SideBarItem>
        <SideBarItem
          path="/Settings"
          iconName="gear"
          iconColor="#b1b1b1"
          isCollapsed={isCollapsed}
        >
          Settings
        </SideBarItem>
        <SideBarItem
          path="/Logs"
          iconName="file-earmark-code"
          iconColor="#9463ea"
          isCollapsed={isCollapsed}
        >
          Logs
        </SideBarItem>
      </ul>
    </div>
  );
};

export default SideBar;
