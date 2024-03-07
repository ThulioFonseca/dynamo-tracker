import { useNotification } from "../../contexts/NotificationProvider/NotificationProvider";

export default function NotificationHub()  {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          <span>{notification.message}</span>
          <button onClick={() => removeNotification(notification.id)}>Fechar</button>
        </div>
      ))}
    </div>
  );
};
