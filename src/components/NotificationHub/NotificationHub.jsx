import { Col, Row } from "react-bootstrap";
import { useNotification } from "../../contexts/NotificationProvider/useNotification";
import "./Style.css";
import NotificationCard from "../NotificationCard/NotificationCard";
export default function NotificationHub() {
  const { notifications, toggleNotificationArea } = useNotification();

  return (
    <div className="notification-hub-container">
      <Row className="w-100 p-3 flex-nowrap m-0">
        <Col className="d-flex justify-content-start align-items-center h-100">
          <h4 className="m-0 align-text-center">Notifications</h4>
        </Col>
        <Col className="d-flex justify-content-end align-items-center p-0 h-100">
          <div className="pe-1 ps-1">
            <button
              onClick={toggleNotificationArea}
              className="close-notification-area-button"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
        </Col>
      </Row>
      <Row className="pe-4 ps-4 w-100 m-0">
        <hr className="notification-divider m-0" />
      </Row>
      {notifications.length === 0 ? (
        <div className="notification-area-empty">
          <i className="bi bi-bell-fill" />
          No notifications yet
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationCard notification={notification} key={notification.id} />
        ))
      )}
    </div>
  );
}
