import { Link } from "wouter";
import "./Style.css";

export default function SideBarItem(props) {
  const { path, children, iconName, iconColor, isCollapsed } = props;
  return (
    <li>
      <Link href={path}>
        <div className="row align-items-center sidebar-item">
          <div
            className={isCollapsed ? "col col-4 p-0" : "col col-2 p-0"}
            style={{ display: "flex", justifyContent: "start" }}
          >
            <i
              className={"bi bi-" + iconName + "-fill sidebar-item-icon"}
              style={{ color: iconColor }}
            ></i>
          </div>
          {!isCollapsed && (
            <div className="col p-0">
              <span
                className="sidebar-item-label"
                style={{ color: "black", fontSize: "13px" }}
              >
                {children}
              </span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}
