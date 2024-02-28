import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import SideBarItem from "../SideBarItem/SideBarItem";

const SideBar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 sidebar">
      <div className="sidebar-arrow-icon-row">
        <i
          className={"bi bi-chevron-double-left sidebar-arrow-icon"}
          style={{ color: "gray" }}
        ></i>
      </div>
      <ul className="mb-auto side-bar-items">
        <SideBarItem path="/Home" iconName="house" iconColor="#509aeb">
          Home
        </SideBarItem>
        <SideBarItem path="/Devices" iconName="motherboard" iconColor="#75bb2c">
          Devices
        </SideBarItem>
        <SideBarItem path="/Settings" iconName="gear" iconColor="#b1b1b1">
          Settings
        </SideBarItem>
        <SideBarItem path="/Logs" iconName="file-earmark-code" iconColor="#9463ea">
          Logs
        </SideBarItem>
      </ul>
    </div>
  );
};

export default SideBar;
