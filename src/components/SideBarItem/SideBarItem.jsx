import { Link } from "wouter";
import "./Style.css";

export default function SideBarItem(props) {
  const { path, children, iconName, iconColor } = props;
  return (
    <li>
      <Link href={path}>
        <div className="row align-items-center sidebar-item">
          <div className="col col-1 p-0">
            <i className={"bi bi-" + iconName + "-fill sidebar-item-icon"} style={{color: iconColor}}></i>
          </div>
          <div className="col">
            <span
              className="sidebar-item-label"
              style={{ color: "black", fontSize: "13px" }}
            >
              {children}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
