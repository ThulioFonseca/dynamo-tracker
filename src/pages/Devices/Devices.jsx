import { Col, Row } from "react-bootstrap";
import SimpleTable from "../../components/Tables/SimpleTable/SimpleTable";
import { Link } from "wouter";
import { HttpService } from "../../Services/HttpService";
import { useNotification } from "../../contexts/NotificationProvider/useNotification";
import { useEffect, useState } from "react";
import "./Style.css";

const header = [
  "Status",
  "Serial Number",
  "Mac-Address",
  "Alias",
  "Vehicle ID",
  "Vehicle Model",
  "Vehicle Brand",
];

const httpService = HttpService("http://localhost:7030/api/");

export default function Devices() {
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const loadDevices = async () => {
    setLoading(true);
    try {
      const response = await httpService.get("/devices");
      setDeviceList(response);
    } catch (error) {
      console.error(error);
      addNotification("error", "Fail to load devices!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = () => {
      loadDevices();
    };

    loadData();
  }, []);

  return (
    <>
      <h3 className="page-title">Devices</h3>
      <p className="page-subtitle">Device management page</p>
      <Row md={8} className="toolbar">
        <Col sm={"auto"} className="toolbar-button">
          <Link href="/Devices/Add" className="toolbar-button-link ">
            <i className="bi bi-plus-lg toolbar-button-icon" />
            <span className="toolbar-button-label">Add Device</span>
          </Link>
        </Col>
        <Col sm={"auto"} className="toolbar-button">
          <Link href="/Devices/Edit" className="toolbar-button-link ">
            <i className="bi bi-pen toolbar-button-icon" />
            <span className="toolbar-button-label">Edit</span>
          </Link>
        </Col>
        <Col sm={"auto"} className="toolbar-button" onClick={() => {}}>
          <i className="bi bi-trash toolbar-button-icon" />
          <span className="toolbar-button-label">Delete</span>
        </Col>
        <Col
          sm={"auto"}
          className="toolbar-button"
          onClick={window.location.reload}
        >
          <i className="bi bi-arrow-clockwise toolbar-button-icon" />
          <span className="toolbar-button-label">Refresh</span>
        </Col>
      </Row>
      <hr className="toolbar-divider" />
      <SimpleTable
        header={header}
        data={deviceList}
        useCheckbox={true}
        onItemsCheckedChange={(checkedItems) => console.log("entrei")}
      />
    </>
  );
}
