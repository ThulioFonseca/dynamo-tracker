import { Col, Container, Row } from "react-bootstrap";
import SimpleTable from "../../components/Tables/SimpleTable/SimpleTable";
import { Link } from "wouter";
import { HttpService } from "../../Services/HttpService";
import { useNotification } from "../../contexts/NotificationProvider/useNotification";
import { useEffect, useState } from "react";
import Spinner from "../../components/Common/Spinner/Spinner";
import Modal from "../../components/Common/Modal/Modal";
import "./Style.css";

const httpService = HttpService("http://localhost:7030/api/");

export default function Devices() {
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItens, setSelectedItens] = useState([]);
  const [disabledEditButton, setDisabledEditButton] = useState(true);
  const [disabledDeleteButton, setDisabledDeleteButton] = useState(true);

  const columns = [
    { header: "Status", dataKey: "status", key: "status" },
    { header: "Serial Number", dataKey: "serialNumber", key: "serialNumber" },
    { header: "Vehicle ID", dataKey: "vehicleId", key: "vehicleId" },
    { header: "Vehicle Model", dataKey: "vehicleModel", key: "vehicleModel" },
    { header: "Vehicle Brand", dataKey: "vehicleBrand", key: "vehicleBrand" },
    { header: "Alias", dataKey: "alias", key: "alias" },
    { header: "Mac Address", dataKey: "macAddress", key: "macAddress" },
  ];

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

  const handleSelectedItens = (itens) => {
    setSelectedItens(itens);
  };

  const deleteDevice = async () => {
    try {

      const objDevice = {
        date: "02/23/2023 15:28:00",
        user: "thulioFonseca",
        devices: selectedItens
      };
      await httpService.delete("/devices", objDevice);
    } catch (error) {
      console.error(error);
      addNotification("error", "Fail to delete device!", error.message);
    } finally {
      handleShowDeleteModal();
      loadDevices();
    }
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  useEffect(() => {
    const loadData = () => {
      loadDevices();
    };

    loadData();
  }, []);

  useEffect(() => {
    switch (selectedItens.length) {
      case 0:
        setDisabledDeleteButton(true);
        setDisabledEditButton(true);
        break;
      case 1:
        setDisabledDeleteButton(false);
        setDisabledEditButton(false);
        break;
      default:
        setDisabledDeleteButton(false);
        setDisabledEditButton(true);
        break;
    }
  }, [selectedItens]);

  return (
    <>
      <h3 className="page-title">Devices</h3>
      <p className="page-subtitle">Device management page</p>

      {loading ? (
        <Container className="w-100 d-flex align-items-center justify-content-center h-75">
          <Spinner />
        </Container>
      ) : (
        <>
          <Row md={8} className="toolbar">
            <Col sm={"auto"} className="toolbar-button">
              <Link href="/Devices/Add" className="toolbar-button-link ">
                <i className="bi bi-plus-lg toolbar-button-icon" />
                <span className="toolbar-button-label">Add Device</span>
              </Link>
            </Col>
            <Col sm={"auto"} className={`toolbar-button ${disabledEditButton ? 'disabled' : ''}`}>
              <Link href="/Devices/Edit" className="toolbar-button-link ">
                <i className={`bi bi-pen toolbar-button-icon ${disabledDeleteButton ? 'disabled' : ''}`} />
                <span className="toolbar-button-label">Edit</span>
              </Link>
            </Col>
            <Col
              sm={"auto"}
              className={`toolbar-button ${disabledDeleteButton ? 'disabled' : ''}`}
              onClick={() => handleShowDeleteModal()}
            >
              <i className={`bi bi-trash toolbar-button-icon ${disabledDeleteButton ? 'disabled' : ''}`} />
              <span className="toolbar-button-label">Delete</span>
            </Col>
            <Col
              sm={"auto"}
              className="toolbar-button"
              onClick={() => loadDevices()}
            >
              <i className="bi bi-arrow-clockwise toolbar-button-icon" />
              <span className="toolbar-button-label">Refresh</span>
            </Col>
          </Row>
          <hr className="toolbar-divider" />
          <SimpleTable
            columns={columns}
            data={deviceList}
            useCheckbox={true}
            onItemsCheckedChange={(checkedItems) =>
              handleSelectedItens(checkedItems)
            }
          />
          <Modal
            isOpen={showDeleteModal}
            title="Delete Device"
            content="Are you sure you want to delete the selected device(s)?"
            onClose={handleShowDeleteModal}
            onConfirm={deleteDevice}
          />
        </>
      )}
    </>
  );
}
