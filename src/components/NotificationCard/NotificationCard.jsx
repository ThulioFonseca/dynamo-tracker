import { Col, Row } from "react-bootstrap";
import "./Style.css";
import { useNotification } from "../../contexts/NotificationProvider/useNotification"

export default function NotificationCard({ notification }) {
  const { removeNotification } = useNotification();

  // Função para obter o ícone e a cor com base no tipo de notificação
  const getIconAndColorByType = (type) => {
    switch (type) {
      case "info":
        return { icon: "bi-info-circle-fill", color: "#0078D4" }; // Azure Blue
      case "warning":
        return { icon: "bi-exclamation-triangle-fill", color: "#FFA800" }; // Amber
      case "success":
        return { icon: "bi-check-circle-fill", color: "#107C10" }; // Green
      case "error":
        return { icon: "bi-x-circle-fill", color: "#D13438" }; // Red
      default:
        return { icon: "bi-info-circle-fill", color: "#0078D4" }; // Azure Blue
    }
  };

  // Destructuring para obter o ícone e a cor com base no tipo de notificação
  const { icon, color } = getIconAndColorByType(notification.type);

  return (
    <Row className="w-100 m-0 notification-card ps-3 pe-3">
      <Row className="w-100 m-0 p-0  mt-2">
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={8}
          className="d-flex justify-content-start align-items-center h-100"
        >
          <i className={`bi ${icon} pe-2`} style={{ color: color }} />{" "}
          <span className="notification-title">{notification.title}</span>
        </Col>
        <Col
          xs={1}
          sm={2}
          md={2}
          lg={4}
          className="d-flex justify-content-end align-items-center p-0 h-100"
        >
          <button
            onClick={() => removeNotification(notification.id)}
            className="close-notification-button"
          >
            <i className="bi bi-x-lg" />
          </button>
        </Col>
      </Row>
      <Row className="notification-message w-100 m-0 mt-1">
        <span className="p-0">{notification.message}</span>
      </Row>
      <Row className="notification-date w-100 mt-1 mb-1 justify-content-end">
        {notification.date}
      </Row>
      <Row className="w-100 m-0 d-flex align-content-center justify-content-center text-center">
        <hr className=" p-0 m-0 notification-divider " />
      </Row>
    </Row>
  );
}
