import { Col, Row } from "react-bootstrap";
import SimpleTable from "../../components/Tables/SimpleTable/SimpleTable";
import "./Style.css";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { HttpService } from "../../Services/HttpService";

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

  const loadDevices = async () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await httpService.get("/devices");
        setDeviceList(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    loadDevices();
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
        onItemsCheckedChange={(checkedItems) => console.log(checkedItems)}
      />
    </>
  );
}
