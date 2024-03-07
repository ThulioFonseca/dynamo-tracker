import "./Style.css";

export default function NotificationContainer({ children }) {
    return <div className="w-25 d-flex flex-column notification-container">{children}</div>;
}